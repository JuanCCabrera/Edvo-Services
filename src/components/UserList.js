import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import Pagination from 'react-js-pagination';
import {addUser, removeUser, unloadUsers} from '../actions/user';
import axios from 'axios';
import uuid from 'uuid';
import getVisibleUsers from '../selectors/users';
import auth0Client from '../Auth';
import moment from 'moment';
import {setSuccessModal} from '../actions/successModal';
import {setLoadingModal} from '../actions/loadingModal';
import {setFailureModal} from '../actions/failureModal';

/**
 * List of users displayed in AppUsers and Assign Recommendations page. 
 */
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Users displayed per page
        this.currentPage = 1;  //current page
        //State contains the page being viewed and the list of users that is visible in that page. 
        this.state = {
            activePage: 1,
            displayedUsers: []
        }
    }
    componentWillUnmount(){
        //Unload users from the controller
        this.props.dispatch(unloadUsers());
    }
    //Configure state when component is being mounted. 
    componentWillMount(){
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Get subscribed users' informations from the database. 
        axios.get('https://beta.edvotech.com/api/admin/settings/users',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            //Format challenge categories from response data
            response.data.users.forEach(element => {
                let categories = []
                if(element.tech)
                    categories.push("Technology Integration") 
                if(element.timemanagement)
                    categories.push("Time Management") 
                if(element.strategies)
                    categories.push("Teaching Strategies") 
                if(element.instructions)
                    categories.push("Instructional Alignment") 
                if(element.material)
                    categories.push("Updated Material") 
                //Load received list of users to the controller. 
                this.props.dispatch(addUser({id: element.userid, name: element.name,
                    email: element.email, lastName: element.lastname, 
                    weeklyReco: element.recomassigned, 
                    categories: categories}));
            });
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
        }).catch(error => {
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
            //Set failure modal
            this.props.dispatch(setFailureModal());
        });

        //Determine users to display in paginated component.
        this.pageSlice = Math.ceil(this.props.users.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageUsers = this.props.users.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedUsers: initialPageUsers});
    }

    //Update page when component updates. 
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items remaining on the current page.
        if(prevProps.users !== this.props.users){
            if(this.state.displayedUsers.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        //Go to first page if filters are modified. 
        if(prevProps.userFilters !== this.props.userFilters){
            this.handlePageChange(1);
        }
    }

    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        this.currentPage = pageNumber;
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit amount of items displayed on last page based on length of the original array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.users.length){
            endIndex = this.props.users.length;
        }
        //Slice original array to obtain list of items to display
        const displayedUsers = this.props.users.slice(startIndex, endIndex);
        //Modify local state
        this.setState(() => ({activePage: pageNumber, displayedUsers: displayedUsers}));
    };

    render(){
        return(
            <div>
                {
                    //List of displayed Users
                }
                {this.state.displayedUsers.map((user) => {
                    return <UserListItem key={user.id} user={user} 
                    userRemoval={() => {
                        //Request a removal of the user form the database. 
                        axios.post('https://beta.edvotech.com/api/admin/settings/users/remove',{
                            userIDToRemove: user.id
                },{
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                })
                .then(response =>{
                    //Set success modal and remove user from controller when successful. 
                    if(response.status == 201){
                    this.props.dispatch(setSuccessModal())                    
                    this.props.dispatch(removeUser({id: user.id}))}}
                )
                .catch(error => {
                    //Set failure modal
                    if(error.response.status != null)
                        this.props.dispatch(setFailureModal());
                })
                    }}/>
                })}
                <br/>
                {
                    //Pagination component
                }
                <div className="text-center">
                
                {(this.props.users.length > 5) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.users.length}
                    onChange={this.handlePageChange}
                    />
                }
                </div>
                {
                    //Message displayed if there are no users in the list
                }
                    {(this.props.users.length === 0) && (this.props.lang === 'English' ?
                     
                     <div className="close-empty-message-card">   
                        {this.props.allUsers.length > 0 ? 
                        <p>There are no recommendations which match the given parameters.</p>
                        :
                        <p>There are no registered users in the system.</p>
                        }
                    </div>
                    :  
                     
                    <div className="close-empty-message-card">
                        {this.props.allUsers.length > 0 ? 
                            <p>No hay usuarios que cumplen con los parámetros dados.</p>
                            :
                            <p>No hay usuarios registrados en el sistema.</p>
                        }
                    </div>)
                    }
            </div>
        )
    }
}

//Map filtered list of users, the user filter data and the current language state to the component properties.
const mapStateToProps = (state) => {
    return{
        allUsers: state.users,
        users: getVisibleUsers(state.users,state.userFilters),
        userFilters: state.userFilters,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(UserList);
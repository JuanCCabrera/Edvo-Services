import React from 'react';
import {connect} from 'react-redux';
import RecommendationsUserListItem from './RecommendationsUserListItem';
import Pagination from 'react-js-pagination';
import getVisibleUsers from '../../selectors/users';
import {addUser} from '../../actions/user';
import axios from 'axios';
import auth0Client from '../../Auth';

/**
 * List of users which appears in the Assign Recommendations list. 
 */
class RecommendationsUserList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Number of users per pages
        this.currentPage = 1;   // current page
        this.state = {
            activePage: 1,
            displayedUsers: []
        }
    }

    
    //Configure state when component is being mounted. This includes determing the initial list to display on the Assign Recommendations page. 
    componentWillMount(){
        axios.get('https://beta.edvotech.com/api/admin/recommendations/users',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            console.log("ASSIGN USERS: ", response);
            response.data.users.forEach(element => {
                this.props.dispatch(addUser({id: element.userid, name: element.name,
                    email: element.email, lastname: element.lastname, 
                    weeklyReco: element.weeklyReco, 
                    categories: element.categories}));
            });
        });
        this.pageSlice = Math.ceil(this.props.users.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageUsers = this.props.users.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedUsers: initialPageUsers});
    }

    //Update page on component update. 
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items remaining on the current page.
        if(prevProps.users !== this.props.users){
            if(this.state.displayedUsers.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }
        {
            //Move to the first page if a filter was applied. 
        }
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    
    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit amount of items displayed on last page based on length of the original array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.users.length){
            endIndex = this.props.users.length;
        }
        
        //Slice original array to obtain list of items to display
        const displayedUsers = this.props.users.slice(startIndex, endIndex);
        //Modify user state
        this.setState(() => ({activePage: pageNumber, displayedUsers: displayedUsers}));
    };

    render(){
        return(
            <div>
            {
                //List of filtereed users. 

            }
                {this.state.displayedUsers.map((user) => {
                    return <RecommendationsUserListItem key={user.id} user={user} selectedUser={this.props.assigned.userID}/>
                })}
                <br/>
                <div className="text-center">
                {
                   //Pagination component
                }
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
                    //Text displayed if there are no users on the Users List. 
                }

                <div className="text-center text-danger">
                    {(this.props.users.length === 0) && (this.props.lang === 'English' ?
                        <p>There are no registered users in the system.</p>
                        :
                        <p>No hay usuarios registrados en el sistema.</p>
                    )}
                </div>
            </div>
        )
    }
}

//Map filtered user list, recommendation assignment data, user filter data and current language state to component properties. 
const mapStateToProps = (state) => {
    return{
        users: getVisibleUsers(state.users, state.userFilters),
        assigned: state.assignRecommendation,
        filters: state.userFilters,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(RecommendationsUserList);
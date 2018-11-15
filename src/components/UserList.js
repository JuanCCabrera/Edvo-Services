import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import Pagination from 'react-js-pagination';
import {addUser, removeUser} from '../actions/user';
import axios from 'axios';
import uuid from 'uuid';
import getVisibleUsers from '../selectors/users';
import auth0Client from '../Auth';

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

    //Configure state when component is being mounted. 
    componentWillMount(){
        axios.get('http://localhost:3000/admin/settings/users',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            response.data.users.forEach(element => {
                console.log("NEW USER: ", element);
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
                    //Page title
                }
                <h3>{this.props.lang === 'English' ? 'Users' : 'Usuarios'}</h3>
                {
                    //List of Users
                }
                {this.state.displayedUsers.map((user) => {
                    return <UserListItem key={user.id} user={user} 
                    userRemoval={() => {
                        this.props.dispatch(removeUser({id: user.id}));
                    }}/>
                })}
                <br/>
                {
                    //Pagination component
                }
                {(this.props.users.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.users.length}
                    onChange={this.handlePageChange}
                    />
                }
                {
                    //Message displayed if there are no users in the list
                }
                {(this.props.users.length === 0) && (this.props.lang === 'English' ?
                    <p>There are no registered users to manage.</p>
                    :
                    <p>No hay usuarios registrados para administrar.</p>
                )
                }
            </div>
        )
    }
}

//Map filtered list of users, the user filter data and the current language state to the component properties.
const mapStateToProps = (state) => {
    return{
        users: getVisibleUsers(state.users,state.userFilters),
        userFilters: state.userFilters,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(UserList);
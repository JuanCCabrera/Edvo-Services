import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import Pagination from 'react-js-pagination';
import {addUser, removeUser} from '../actions/user';
import axios from 'axios';
import uuid from 'uuid';
import getVisibleUsers from '../selectors/users';
import auth0Client from '../Auth';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.state = {
            activePage: 1,
            displayedUsers: []
        }
    }

    componentWillMount(){
        axios.get('http://localhost:3000/admin/settings/users',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            response.data.users.forEach(element => {
                //Change id for userID when DB connection is ready
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

    componentDidUpdate(prevProps){
        if(prevProps.users !== this.props.users){
            if(this.state.displayedUsers.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        if(prevProps.userFilters !== this.props.userFilters){
            this.handlePageChange(1);
        }
    }

    handlePageChange = (pageNumber) => {
        this.currentPage = pageNumber;
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        let endIndex = (pageNumber)*this.itemsPerPage;
        if(((pageNumber)*this.itemsPerPage) > this.props.users.length){
            endIndex = this.props.users.length;
        }
        const displayedUsers = this.props.users.slice(startIndex, endIndex);
        this.setState(() => ({activePage: pageNumber, displayedUsers: displayedUsers}));
    };

    render(){
        return(
            <div>
                <h3>{this.props.lang === 'English' ? 'Users' : 'Usuarios'}</h3>
                {this.state.displayedUsers.map((user) => {
                    return <UserListItem key={user.id} user={user} 
                    userRemoval={() => {
                        this.props.dispatch(removeUser({id: user.id}));
                    }}/>
                })}
                <br/>
                {(this.props.users.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.users.length}
                    onChange={this.handlePageChange}
                    />
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

const mapStateToProps = (state) => {
    return{
        users: getVisibleUsers(state.users,state.userFilters),
        userFilters: state.userFilters,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(UserList);
import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import Pagination from 'react-js-pagination';
import {removeUser} from '../actions/user';

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
                <h3>Users</h3>
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
                {(this.props.users.length === 0) &&
                    <p>There are no registered users in the system.</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(UserList);
import React from 'react';
import {connect} from 'react-redux';
import RecommendationsUserListItem from './RecommendationsUserListItem';
import Pagination from 'react-js-pagination';

class RecommendationsUserList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5;
        this.state = {
            activePage: 1,
            displayedUsers: []
        }
    }

    componentWillMount(){
        this.pageSlice = Math.ceil(this.props.users.length/this.itemsPerPage);
        const initialPageUsers = this.props.users.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedUsers: initialPageUsers});
    }

    handlePageChange = (pageNumber) => {
        console.log(pageNumber);
        console.log(this.props.users.length);
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
                    return <RecommendationsUserListItem key={user.id} user={user} selectedUser={this.props.assigned.userID}/>
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
        users: state.users,
        assigned: state.assignRecommendation
    }
}

export default connect(mapStateToProps)(RecommendationsUserList);
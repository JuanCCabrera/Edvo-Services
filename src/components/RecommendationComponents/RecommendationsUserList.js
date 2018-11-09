import React from 'react';
import {connect} from 'react-redux';
import RecommendationsUserListItem from './RecommendationsUserListItem';
import Pagination from 'react-js-pagination';
import getVisibleUsers from '../../selectors/users';

class RecommendationsUserList extends React.Component{
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
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
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
                {(this.props.users.length === 0) && (this.props.lang === 'English' ?
                    <p>There are no registered users in the system.</p>
                    :
                    <p>No hay usuarios registrados en el sistema.</p>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        users: getVisibleUsers(state.users, state.userFilters),
        assigned: state.assignRecommendation,
        filters: state.userFilters,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecommendationsUserList);
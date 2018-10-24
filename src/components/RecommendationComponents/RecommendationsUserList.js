import React from 'react';
import {connect} from 'react-redux';
import RecommendationsUserListItem from './RecommendationsUserListItem';

class RecommendationsUserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1}
    }

    render(){
        return(
            <div>
                <h3>Users</h3>
                {this.props.users.map((user) => {
                    return <RecommendationsUserListItem key={user.id} user={user} selectedUser={this.props.assigned.userID}/>
                })}
                <br/>
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
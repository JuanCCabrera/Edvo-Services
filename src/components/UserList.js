import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import uuid from 'uuid';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {pages: 1}
    }

    render(){
        return(
            <div>
                <h3>Users</h3>
                {this.props.users.map((user) => {
                    return <UserListItem key={uuid()} user={user}/>
                })}
                <br/>
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
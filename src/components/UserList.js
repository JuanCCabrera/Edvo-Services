import React from 'react';
import {connect} from 'react-redux';
import UserListItem from './UserListItem';
import axios from 'axios';
import {addUser} from '../actions/user';
import uuid from 'uuid';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {pages: 1}
    }

    componentWillMount(){
        console.log("I WILL MOUNT!!");
        axios.get('http://localhost:8081/users')
        .then(response => {
            response.data.forEach(element => {
                //Change id for userID when DB connection is ready
                this.props.dispatch(addUser({id: uuid(), name: element.name , 
                    lastname: element.lastname, weeklyReco: element.weeklyReco, 
                    categories: element.categories}));
            });
                
            
        
        });
    }

    render(){
        return(
            <div>
                <h3>Users</h3>
                {this.props.users.map((user) => {
                    return <UserListItem key={user.id} user={user}/>
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
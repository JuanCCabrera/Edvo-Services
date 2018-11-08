import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import 'babel-polyfill';
import axios from 'axios';

class Callback extends Component {

    async componentDidMount() {
        let route = auth0Client.getRedirectRoute();
        try{
            await auth0Client.handleAuthentication();
        }catch(err){
            auth0Client.signOut();
            route = '/login';
        }
        await axios.get('http://localhost:3000/register/user',  {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
          }).then(response =>{
            route = '/teacher/home';
          })
          .catch(error => {
            if(error.response.status == 403)
                route = '/register';
            else{
                auth0Client.signIn();
            }

          });
        this.props.history.replace(route);
    }

    render(){
        return(
            <p>loading...</p>
        );
    }
}

export default withRouter(Callback);
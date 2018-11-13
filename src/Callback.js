import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import auth0Client from './Auth';
import 'babel-polyfill';
import axios from 'axios';

class Callback extends Component {

    async componentDidMount() {
        let route = auth0Client.getRedirectRoute();
        let email = true;
        try{
            await auth0Client.handleAuthentication();
        }catch(err){
            console.log("DATA: ",err)
            console.log("CALLBACK CATCH:", err.errorDescription);
            localStorage.setItem('loginError',err.errorDescription);
            email = false;
            this.props.history.replace('/login');
        }
        if(email){
            await axios.get('http://localhost:3000/register/user',  {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{                
                localStorage.setItem('role',response.data.body.user[0].usertype);
                route = '/'+localStorage.getItem('role')+'/home';
            })
            .catch(error => {
                console.log("ERROR CALLBACK REQ: ", error);
                if(error.response.status == 403)
                    route = '/register';
                else{
                    auth0Client.signIn();
                }

            });
            this.props.history.replace(route);
        }
    }

    render(){
        return(
            <p>loading...</p>
        );
    }
}

export default withRouter(Callback);
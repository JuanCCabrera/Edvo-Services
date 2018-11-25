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
            localStorage.setItem('loginError',err.errorDescription);
            email = false;
            this.props.history.replace('/login');
        }
        if(email){
            await axios.get('https://beta.edvotech.com/api/user',  {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{ 
                
                localStorage.setItem('role',response.data.body.user[0].usertype);
                route = '/'+localStorage.getItem('role')+'/home';
                localStorage.removeItem('loginError');             
                axios.post('https://beta.edvotech.com/api/log', {},
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
                    .then((response)=>{
                            console.log("LOGGED");
                    });
            })
            .catch(error => {
                if(error.response.status == 403)
                    route = '/register';
                else{
                    localStorage.clear();
                    auth0Client.signIn();
                }

            });
            this.props.history.replace(route);
        }
    }

    render(){
        return(
            <div className="container">
                <div className="card text-center">
                    <div style={{listStyleType: 'none', verticalAlign: 'center'}}>
                        <h1>Loading...</h1>
                        <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Callback);
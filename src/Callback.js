import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import auth0Client from './Auth';
import 'babel-polyfill';
import axios from 'axios';
import {setRole, setAuthentication} from './actions/credentials';
import {connect} from 'react-redux';

/*
    Class used to handle the callback done by Auth0 that brings the authentication token
*/
class Callback extends React.Component {
    constructor(props){
        super(props);
    }

    //If the component successfully loaded it carries out the operations inside it
    async componentDidMount() {
        //Get the route the user was trying to access before logging-in
        let route = auth0Client.getRedirectRoute();
        let email = true;
        try{
            //Sends received token to the Auth class
            await auth0Client.handleAuthentication();
        }catch(err){
            //If an error occurred it logs it and displays it in the Login component
            localStorage.setItem('loginError',err.errorDescription);
            email = false;
            this.props.history.replace('/login');
        }
        //If the email was verified
        if(email){
            //Queries the database to check if the user exists, if not it is redirected to the /register route
            await axios.get('https://beta.edvotech.com/api/user',  {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{ 
                localStorage.setItem('role',response.data.user[0].usertype);
                this.props.dispatch(setRole({role: response.data.user[0].usertype}));
                this.props.dispatch(setAuthentication({isAuthenticated: true}));
                route = '/'+localStorage.getItem('role')+'/home';
                localStorage.removeItem('loginError');     
                //Records the date and time a user logged in the system        
                axios.post('https://beta.edvotech.com/api/log', {},
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
                    .then((response)=>{
                            
                            this.props.dispatch(setRole({role: localStorage.getItem('role')}));
                    });
            })
            .catch(error => {
                if(error.response.status == 403){
                    route = '/register';
                    localStorage.removeItem('loginError');
                }
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
                <div className="text-center loading-card">
                    <div style={{listStyleType: 'none', verticalAlign: 'center'}}>
                        <h1>{this.props.lange === 'English' ? 'Loading...' : 'Cargando...'}</h1>
                        <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

//Maps language settings with the Class
const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

//Connects and exports the Class to the Store
export default withRouter(connect(mapStateToProps)(Callback));
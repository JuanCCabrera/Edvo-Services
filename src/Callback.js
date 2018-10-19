import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import PlansPage from './components/Plans';
import 'babel-polyfill';

class Callback extends Component {

    async componentDidMount() {
        let route = auth0Client.getRedirectRoute();
        try{
            await auth0Client.handleAuthentication();
        }catch(err){
            console.log("ERROR ON LOGIN : ", err.errorDescription);
            auth0Client.signOut();
            console.log("I SIGNED OUT?");
            route = '/login';
        }
        this.props.history.replace(route);
    }

    render(){
        return(
            <p>loading...</p>
        );
    }
}

export default withRouter(Callback);
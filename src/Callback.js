import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import PlansPage from './components/Plans';
import 'babel-polyfill';

class Callback extends Component {

    async componentDidMount() {
        try{
            await auth0Client.handleAuthentication();
        }catch(err){
            return err;
        }
        this.props.history.replace('/');
    }

    render(){
        return(
            <p>loading...</p>
        );
    }
}

export default withRouter(Callback);
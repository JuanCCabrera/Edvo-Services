import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../Auth';

/**
 * SecuredRoute - Comoponent which verifies the permissions a user has when entering a route hosted by the application's page router. 
 * If a user does not have the necessary permissions required to enter a route, then a user will be redirected to the Auth0 login page. 
 * @param {*} props - default component properties
 */
function SecuredRoute(props) {
    //Determine current component path
    const {component: Component, path} = props;
    //Returns current route only if user has been authenticated by Auth0 to be a valid user with the necessary permissions to access the route. 
    return(
        <Route exact path={path} render={() => {
            if(!auth0Client.isAuthenticated()) {
                localStorage.setItem('route', props.path);
                auth0Client.signIn();
                return <div/>;
            }
            return <Route {...props} component={Component}/>
        }}/>
    );
}

export default SecuredRoute;
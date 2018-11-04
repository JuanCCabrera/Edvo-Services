import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../Auth';

function SecuredRoute(props) {
    const {component: Component, path} = props;
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
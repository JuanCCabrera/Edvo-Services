import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'babel-polyfill';
import 'react-router';
import auth0Client from './Auth';
import uuid from 'uuid';
import {addUser} from './actions/user';
import {addSchool} from './actions/school';
import {createRecommendation} from './actions/recommendations';

const store = configureStore();

store.dispatch(addUser({id: uuid(), name: 'Pablo', lastName: 'Picasso', email: 'pablo.picasso@upr.edu', weeklyReco: false, categories: ['Tech', 'Potato']}));
store.dispatch(addUser({id: uuid(), name: 'Daniel', lastName: 'Rodriguez', email: 'daniel.rodriguez44@upr.edu', weeklyReco: true, categories: ['Tech', 'Instro']}));
store.dispatch(addSchool({id: uuid(), name: 'Colegio San Palomita', location: 'En la esquina', type: 'Public', numAccounts: 10}));
store.dispatch(addSchool({id: uuid(), name: 'Colegio Santo Potato', location: 'Al lao\' del McDonald\'s', type: 'Public', numAccounts: 20}));
store.dispatch(createRecommendation({id: uuid(), title: 'Compound Interest', header: 'Test data', multimedia: 'none', description: '#1'}));
store.dispatch(createRecommendation({id: uuid(), title: 'New Kids Welcome!', header: 'Test data', multimedia: 'none', description: '#2'}));


class App extends React.Component{
    async componentDidMount() {
        try{
            await auth0Client.silentAuth();
            this.forceUpdate();
        }catch(err){
            if(err.error === 'login_required') return;
            console.log(err.error);
        }
    }

    render() {
            return(
                <Provider store={store}> 
                    <AppRouter/>
                </Provider>
            );
        }

}

ReactDOM.render(<App/>, document.getElementById('root'));


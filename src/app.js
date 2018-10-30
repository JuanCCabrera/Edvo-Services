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
import {loadRecommendation} from './actions/recommendations';
import { loadQuestion } from './actions/question';
import { loadClass } from './actions/classes';

const store = configureStore();

store.dispatch(addUser({id: uuid(), name: 'Pablo', lastName: 'Picasso', email: 'pablo.picasso@upr.edu', weeklyReco: false, categories: ['Tech', 'Potato']}));
store.dispatch(addUser({id: uuid(), name: 'Daniel', lastName: 'Rodriguez', email: 'daniel.rodriguez44@upr.edu', weeklyReco: true, categories: ['Tech', 'Instro']}));
store.dispatch(addSchool({id: uuid(), name: 'Colegio San Palomita', location: 'En la esquina', type: 'Public', numAccounts: 10}));
store.dispatch(addSchool({id: uuid(), name: 'Colegio Santo Potato', location: 'Al lao\' del McDonald\'s', type: 'Public', numAccounts: 20}));
store.dispatch(loadRecommendation({id: uuid(), title: 'Compound Interest', header: 'Test data', multimedia: 'none', description: '#1'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'New Kids Welcome!', header: 'Test data', multimedia: 'none', description: '#2'}));
store.dispatch(loadQuestion({question: 'Where is the dog?', askedDate: '2018-10-28 06:20:25', subject: 'Can\'t find the dog.', userId: uuid()}));
store.dispatch(loadQuestion({question: 'What is an emu?', askedDate: '2018-10-27 12:24:24', subject: 'Doubts about animals.', userId: uuid()}));
store.dispatch(loadClass({userId: uuid(), classInfoId: uuid(), subject: 'Calculus I', format: 'Classroom', language: 'Spanish', level: 'University/College', groupSize: '1 - 10', topicA: 'Diff Equations', topicB: '2D Integrals'}));
store.dispatch(loadClass({userId: uuid(), classInfoId: uuid(), subject: 'History I', format: 'Online', language: 'English', level: '7th - 8th grade', groupSize: '11 - 20', topicA: 'World War 1', topicB: 'World War 2'}));
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


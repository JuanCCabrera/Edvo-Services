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
import { loadPlan } from './actions/plan';
import {loadTeacherDaysInPlatform, loadTeacherRecentRecommendation} from './actions/teacherMetrics';
import {loadTeacherTopRecommendation} from './actions/teacherMetrics';
import {loadTeacherRecommendation} from './actions/teacherRecommendations';
import {loadTeacherQuestion} from './actions/teacherQuestions';

const store = configureStore();

store.dispatch(addUser({id: uuid(), name: 'Pablo', lastName: 'Picasso', email: 'pablo.picasso@upr.edu', weeklyReco: false, categories: ['Technology Integration', 'Teaching Strategies']}));
store.dispatch(addUser({id: uuid(), name: 'Daniel', lastName: 'Rodriguez', email: 'daniel.rodriguez44@upr.edu', weeklyReco: true, categories: ['Technology Integration', 'Instructional Alignment']}));
store.dispatch(addUser({id: uuid(), name: 'Arsalan', lastName: 'Leeway', email: 'ars.leway@upr.edu', weeklyReco: false, categories: ['Technology Integration', 'Teaching Strategies']}));
store.dispatch(addUser({id: uuid(), name: 'Mary', lastName: 'Kate', email: 'mary.kate@capone.edu', weeklyReco: true, categories: ['Instructional Alignment', 'Updated Material']}));
store.dispatch(addUser({id: uuid(), name: 'Daniel', lastName: 'Arhuella', email: 'daniel.arhuella3@upr.edu', weeklyReco: false, categories: ['Updated Material', 'Technology Integration']}));
store.dispatch(addUser({id: uuid(), name: 'Felipe', lastName: 'Ortiz', email: 'felipe.ortiz@gmail.com', weeklyReco: true, categories: ['Technology Integration', 'Instructional Alignment']}));

store.dispatch(addSchool({id: uuid(), name: 'Colegio San Palomita', location: 'En la esquina', type: 'Public', numAccounts: 10}));
store.dispatch(addSchool({id: uuid(), name: 'Colegio Santo Potato', location: 'Al lao\' del McDonald\'s', type: 'Public', numAccounts: 20}));

store.dispatch(loadRecommendation({id: uuid(), title: 'Compound Interest', header: 'Test data', multimedia: 'none', description: '#1'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'New Kids Welcome!', header: 'Test data', multimedia: 'none', description: '#2'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'The Congo', header: 'Test data', multimedia: 'none', description: '#3'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'Integrating Technology', header: 'Test data', multimedia: 'none', description: '#4'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'All Aboard! Studying at Sea', header: 'Test data', multimedia: 'none', description: '#5'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'Finding Your Calling', header: 'Test data', multimedia: 'none', description: '#6'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'A New Method for Teaching Online', header: 'Test data', multimedia: 'none', description: '#7'}));
store.dispatch(loadRecommendation({id: uuid(), title: 'Give Your Students a Fair Chance', header: 'Test data', multimedia: 'none', description: '#8'}));

store.dispatch(loadQuestion({question: 'Where is the dog?', askedDate: '2018-10-28 06:20:25', subject: 'Can\'t find the dog.', userId: uuid()}));
store.dispatch(loadQuestion({question: 'What is an emu?', askedDate: '2018-10-27 12:24:24', subject: 'Doubts about animals.', userId: uuid()}));
store.dispatch(loadQuestion({question: 'How can I integrate technolgy into the classroom?', askedDate: '2018-10-28 06:20:21', subject: 'Technology Integration Question', userId: uuid()}));
store.dispatch(loadQuestion({question: 'Hi there! How do I use the recommendations page?', askedDate: '2018-10-27 12:24:14', subject: 'Recommendation Page Question', userId: uuid()}));
store.dispatch(loadQuestion({question: 'What kind of technology should I use in class?', askedDate: '2018-10-28 06:20:23', subject: 'Types of Tech for Classrooms', userId: uuid()}));
store.dispatch(loadQuestion({question: 'What should I do?', askedDate: '2018-10-27 12:24:04', subject: 'Best way to get students to listen in class', userId: uuid()}));

store.dispatch(loadClass({userId: uuid(), classInfoId: uuid(), subject: 'Calculus I', format: 'Classroom', language: 'Spanish', level: 'University/College', groupSize: '1 - 10', topicA: 'Diff Equations', topicB: '2D Integrals'}));
store.dispatch(loadClass({userId: uuid(), classInfoId: uuid(), subject: 'History I', format: 'Online', language: 'English', level: '7th - 8th grade', groupSize: '11 - 20', topicA: 'World War 1', topicB: 'World War 2'}));

store.dispatch(loadPlan({name: 'Premium', status: 'active'}));

store.dispatch(loadTeacherDaysInPlatform({daysInPlatform: 5}));
store.dispatch(loadTeacherTopRecommendation({recoID: uuid(), title: 'Integrating Technology', header: 'Test data', location: 'Test location', description: 'Learn more about how to integrate technology using this video!', multimedia: 'multimediaLink', date: '2018-10-27 06:20:19', rating: 5}));
store.dispatch(loadTeacherTopRecommendation({recoID: uuid(), title: 'Updating Old Material', header: 'Test data', location: 'Test location', description: 'Learn more about how to update class material using this video!', multimedia: 'multimediaLink', date: '2018-10-26 06:20:20', rating: 5}));
store.dispatch(loadTeacherTopRecommendation({recoID: uuid(), title: 'Seeking Help for Students', header: 'Test data', location: 'Test location', description: 'Learn more about how to seek help for students using this video!', multimedia: 'multimediaLink', date: '2018-10-25 06:20:21', rating: 5}));

store.dispatch(loadTeacherRecentRecommendation({recoID: uuid(), title: 'Integrating Technology', header: 'Test data', location: 'Test location', description: 'Learn more about how to integrate technology using this video!', multimedia: 'multimediaLink', date: '2018-10-27 06:20:19', rating: 5}));
store.dispatch(loadTeacherRecentRecommendation({recoID: uuid(), title: 'Updating Old Material', header: 'Test data', location: 'Test location', description: 'Learn more about how to update class material using this video!', multimedia: 'multimediaLink', date: '2018-10-26 06:20:20', rating: 5}));
store.dispatch(loadTeacherRecentRecommendation({recoID: uuid(), title: 'Seeking Help for Students', header: 'Test data', location: 'Test location', description: 'Learn more about how to seek help for students using this video!', multimedia: 'multimediaLink', date: '2018-10-25 06:20:21', rating: 5}));

store.dispatch(loadTeacherRecommendation({recoID: uuid(), title: 'Integrating Technology', header: 'Test data', location: 'Test location', description: 'Learn more about how to integrate technology using this video!', multimedia: 'multimediaLink', date: '2018-10-27 06:20:19', read: false, rating: 5}));
store.dispatch(loadTeacherRecommendation({recoID: uuid(), title: 'Updating Old Material', header: 'Test data', location: 'Test location', description: 'Learn more about how to update class material using this video!', multimedia: 'multimediaLink', date: '2018-10-26 06:20:20', read: true, rating: 5}));
store.dispatch(loadTeacherRecommendation({recoID: uuid(), title: 'Seeking Help for Students', header: 'Test data', location: 'Test location', description: 'Learn more about how to seek help for students using this video!', multimedia: 'multimediaLink', date: '2018-10-25 06:20:21', read: true, rating: 5}));
store.dispatch(loadTeacherRecommendation({recoID: uuid(), title: 'Analyzing Class Attendance', header: 'Test data', location: 'Test location', description: 'Learn more about how to analyze class attendance using this video!', multimedia: 'multimediaLink', date: '2018-10-24 06:20:22', read: false, rating: 5}));
store.dispatch(loadTeacherRecommendation({recoID: uuid(), title: 'Why Give Quizzes?', header: 'Test data', location: 'Test location', description: 'Learn more about how to analyze the option to give quizzes by using this video!', multimedia: 'multimediaLink', date: '2018-10-10 06:20:23', read: true, rating: 5}));

store.dispatch(loadTeacherQuestion({askedDate: '2018-10-10 06:10:25', subject: 'Technolgy Integration', question: 'How can I integrate technolgy into the classroom?', answer: 'Just do it!', answerDate: '2018-10-11', rate: 1, favorite: false, read: false}));
store.dispatch(loadTeacherQuestion({askedDate: '2018-10-11 07:30:24', subject: 'Updated Material', question: 'How can I update material for my class?', answer: 'Just do it!', answerDate: '2018-10-11', rate: 1, favorite: false, read: true}));

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


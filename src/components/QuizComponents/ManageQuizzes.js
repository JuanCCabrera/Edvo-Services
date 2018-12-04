import React from 'react';
import PendingQuizzesList from './PendingQuizzesList';
import ReturnButtonList from './ReturnButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * Teacher Quizzes page layout. 
 * @param {*} props - Default component propterties
 */
const ManageQuizzes = (props) => (
    //Authenticate user information to grant access to Manage Quizzes. 
    <Can
    role={auth0Client.getRole()}
    perform="teacher:quizzes-view"
    yes={() => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                {
                    //Button list to return to Teacher Recommendations page. 
                }
                    <div className="text-center well">
                        <ReturnButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                {
                    //Pending Quizzes list. 
                }
                    <div className="text-center pending__title__2">
                        <p>{props.lang === 'English' ? 'Pending Quizzes' : 'Pruebas \nPendientes'}</p>
                        <hr className="break"/>
                    </div>
                    <PendingQuizzesList/>
                </div>
            </div>
        </div>
    </div>     )}
    //Redirect user to login page if not authorized. 
     no={() => <Redirect to="/login" />}
   />
);

export default ManageQuizzes;
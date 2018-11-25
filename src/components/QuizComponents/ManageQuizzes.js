import React from 'react';
import QuizButtonList from './QuizButtonList';
import PendingQuizzesList from './PendingQuizzesList';

const ManageQuizzes = (props) => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <div className="text-center well">
                        <QuizButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                    <div className="text-center pending__title__2">
                        <p>{props.lang === 'English' ? 'Pending Quizzes' : 'Pruebas \nPendientes'}</p>
                        <hr className="break"/>
                    </div>
                    <PendingQuizzesList/>
                </div>
            </div>
        </div>
    </div>
);

export default ManageQuizzes;
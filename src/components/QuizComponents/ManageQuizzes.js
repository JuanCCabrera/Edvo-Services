import React from 'react';
import QuizButtonList from './QuizButtonList';
import PendingQuizzesList from './PendingQuizzesList';

const ManageQuizzes = (props) => (
    <div>
        <QuizButtonList/>
        <PendingQuizzesList/>
    </div>
);

export default ManageQuizzes;
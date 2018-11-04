import React from 'react';
import QuestionButtonList from './QuestionButtonList';
import PendingQuestionsList from './PendingQuestionsList';

const ManageQuestions = (props) => (
    <div>
        <QuestionButtonList/>
        <PendingQuestionsList/>
    </div>
);

export default ManageQuestions;
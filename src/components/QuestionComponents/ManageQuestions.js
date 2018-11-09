import React from 'react';
import QuestionButtonList from './QuestionButtonList';
import PendingQuestionsList from './PendingQuestionsList';
import QuestionFilters from '../Filters/QuestionFilters';

const ManageQuestions = (props) => (
    <div>
        <QuestionButtonList/>
        <QuestionFilters/>
        <PendingQuestionsList/>
    </div>
);

export default ManageQuestions;
import React from 'react';
import QuestionButtonList from './QuestionButtonList';
import PendingQuestionsList from './PendingQuestionsList';
import QuestionFilters from '../Filters/QuestionFilters';

/**
 * Manage Questions page layout. 
 * @param {*} props - Default properties
 */
const ManageQuestions = (props) => (
    <div>
        <QuestionButtonList/>
        <QuestionFilters/>
        <PendingQuestionsList/>
    </div>
);

export default ManageQuestions;
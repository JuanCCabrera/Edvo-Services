import React from 'react';
import QuestionButtonList from './QuestionButtonList';
import PendingQuestionsList from './PendingQuestionsList';
import QuestionFilters from '../Filters/QuestionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

const ManageQuestions = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:questions-manage"
    yes={() => (
    <div>
        <QuestionButtonList/>
        <QuestionFilters/>
        <PendingQuestionsList/>
    </div>
        )}
        no={() => <Redirect to="/" />}
      />
);

export default ManageQuestions;
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const PendingQuizzesListItem = (props) => (
    <div>
        <h4>{props.quiz.quizID}</h4>
        <Link to={`/teacher/quizzes/${props.quiz.quizID}`}><button>Answer</button></Link>
    </div>
);

export default connect()(PendingQuizzesListItem);



import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const PendingQuizzesListItem = (props) => (
    <div>
        {console.log("QUIZ PROPS ITEM: ", props)}
        <h2>{props.quiz.quizID}</h2>
        {props.quiz.score == null && <Link to={`/teacher/quizzes/${props.quiz.quizID}`}><button>Answer</button></Link>}
        {props.quiz.score != null && <p>{props.quiz.quizID} score was: {props.quiz.score}</p>}
    </div>
);

export default connect()(PendingQuizzesListItem);



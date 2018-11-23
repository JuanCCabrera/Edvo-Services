import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

const PendingQuizzesListItem = (props) => (
    <div>
        {console.log("QUIZ PROPS ITEM: ", props)}
        <h2>{moment(props.quiz.quizDate).format("YYYY-MM") } Quiz</h2>
        {props.quiz.score == null && <Link to={`/teacher/quizzes/${props.quiz.quizID}`}><button>Answer</button></Link>}
        {props.quiz.score != null && <Link to={`/teacher/quizzes/view/${props.quiz.quizID}`}><button>View Answers</button></Link>}
        {props.quiz.score != null && <p>score was: {props.quiz.score}</p>}
    </div>
);

export default connect()(PendingQuizzesListItem);



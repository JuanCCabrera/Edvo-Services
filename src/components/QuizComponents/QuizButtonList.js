import React from 'react';
import {Link} from 'react-router-dom';

const QuizButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/teacher/quizzes"}>View Pending Quizzes</Link>
    </div>
);

export default QuizButtonList;
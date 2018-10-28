import React from 'react';
import {Link} from 'react-router-dom';

const QuestionButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/staff/questions"}>View Pending Questions</Link>
    </div>
);

export default QuestionButtonList;
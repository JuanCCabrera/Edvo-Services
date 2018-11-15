import React from 'react';
import { connect } from 'react-redux';
import {removeQuestion} from '../../actions/question';
import {Link} from 'react-router-dom';

/**
 * Single item in the Pending Questions list
 * @param {*} props - Pending question item information containing the following object model: 
    question_item: {
        question: '',
        askedDate: '',
        subject: '',
        userId: ''
    }
 */
const PendingQuestionsListItem = (props) => (
    <div>
    {
        //Question subject
    }
        <h4>{props.question.subject}</h4>
    {
        //Question body
    }
        <h5>{props.question.question}</h5>
    {
        //Button to remove a question from the list of Pending Questions.
    }
        <button onClick={() => {
            props.dispatch(removeQuestion({questionID: props.question.questionID, askedDate: props.question.askedDate, userId: props.question.userId}));
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    {
        //Navigation link to the Answer Question page with a specific question identifier. 
    }
        <Link to={`/staff/questions/${props.question.askedDate}/${props.question.userId}`}><button>{props.lang === 'English' ? 'Answer' : 'Responder'}</button></Link>
    </div>
);

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(PendingQuestionsListItem);



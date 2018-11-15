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
    <div className="item-card">
    {
        //Question subject
    }
        <p className="item__body card-title">{props.question.subject}</p>
    {
        //Question body
    }
        <p className="item__body">{props.question.question}</p>

    {
        //Navigation link to the Answer Question page with a specific question identifier. 
    }
        <Link to={`/staff/questions/${props.question.askedDate}/${props.question.userId}`}>
            <button>
                <div className="btn btn-item">{props.lang === 'English' ? 'Answer' : 'Responder'}</div>
            </button>
        </Link>
    {
        //Button to remove a question from the list of Pending Questions.
    }
        
        <button onClick={() => {
            props.dispatch(removeQuestion({questionID: props.question.questionID, askedDate: props.question.askedDate, userId: props.question.userId}));
        }}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'Remove' : 'Remover'}
            </div>
        </button>
    
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



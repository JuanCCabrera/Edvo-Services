import React from 'react';
import { connect } from 'react-redux';
import {removeQuestion} from '../../actions/question';
import {Link} from 'react-router-dom';

const PendingQuestionsListItem = (props) => (
    <div>
        <h4>{props.question.subject}</h4>
        <h5>{props.question.question}</h5>
        <button onClick={() => {
            props.dispatch(removeQuestion({questionID: props.question.questionID, askedDate: props.question.askedDate, userId: props.question.userId}));
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
        <Link to={`/staff/questions/${props.question.askedDate}/${props.question.userId}`}><button>{props.lang === 'English' ? 'Answer' : 'Responder'}</button></Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(PendingQuestionsListItem);



import React from 'react';
import {connect} from 'react-redux';
import {selectQuestion} from '../../actions/teacherQuestions';

const TeacherQuestionListItem = (props) => (
        <div onClick={() => {props.dispatch(selectQuestion(props.question));}}>
            <h4>{props.question.subject}</h4> <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {props.question.askedDate}</h5>
            <h5>{props.question.question}</h5>
        </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherQuestionListItem);
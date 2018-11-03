import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

const QuestionModal = (props) => (
    <Modal
    isOpen = {props.question.subject !== ''}
    onRequestClose = {props.clearSelectedQuestion}
    contentLabel="Question"
    >
        <h2>{props.question.subject}</h2>
        <h3>{props.question.question}</h3>
        <p>{props.question.answer}</p>
        <h4>{props.lang === 'English' ? 'Date: ' : 'Fecha: '}{props.question.askedDate}</h4>
        <button onClick = {props.clearSelectedQuestion}>{props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
    </Modal>
);

const mapStateToProps = (state) => {
    return {
        question: state.teacherQuestions.selectedQuestion,
        lang: state.language.lang,
    }
}
export default connect(mapStateToProps)(QuestionModal);
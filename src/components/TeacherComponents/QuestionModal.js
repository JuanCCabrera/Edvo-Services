import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { rateQuestion } from '../../actions/teacherQuestions';
import StarRatingComponent from 'react-star-rating-component';

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
        <h4>{props.lang === 'English' ? 'Rate: ': 'Clasificar: '}</h4>
        <StarRatingComponent
            name="rate"
            starCount={5}
            value={props.question.rate}
            onStarClick={(nextValue, prevValue, name) => {props.dispatch(rateQuestion({askedDate: props.question.askedDate, rate: nextValue}))}}
        />
        <br/>
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
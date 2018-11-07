import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { rateQuestion, addFavoriteQuestion, removeFavoriteQuestion } from '../../actions/teacherQuestions';
import StarRatingComponent from 'react-star-rating-component';

const QuestionModal = (props) => (
    <Modal
    isOpen = {props.question.subject !== ''}
    onRequestClose = {props.clearSelectedQuestion}
    contentLabel="Question"
    >
    <div className="container">
        <div className="row">
            <div className="col-lg-10">
                <h2>{props.question.subject}</h2>
            </div>
            <div className="col-lg-1">
            <h3>{props.lang === 'English' ? 'Favorite' : 'Favorita'}: </h3>
            </div>
            <div className="col-lg-1">
                <StarRatingComponent
                    name="favorite"
                    starCount={1}
                    value={props.isFavorite}
                    onStarClick={(nextValue, prevValue, name) => {
                        if(prevValue === 0){
                            //Add to favorites list 
                            props.dispatch(addFavoriteQuestion({askedDate: props.question.askedDate}));
                        }else{
                            //Remove from favorites list through filter
                            props.dispatch(removeFavoriteQuestion({askedDate: props.question.askedDate}));
                        }
                    }}
                />
            
            </div>
        </div>
    </div>
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
    let val = 0;
    if(state.teacherQuestions.selectedQuestion){
        if(state.teacherQuestions.selectedQuestion.favorite === true){
            val = 1;
        }
    }
    return {
        question: state.teacherQuestions.selectedQuestion,
        isFavorite: val,
        lang: state.language.lang,
    }
}
export default connect(mapStateToProps)(QuestionModal);
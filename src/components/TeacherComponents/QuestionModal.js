import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { rateQuestion, addFavoriteQuestion, removeFavoriteQuestion } from '../../actions/teacherQuestions';
import StarRatingComponent from 'react-star-rating-component';

/**
 * Modal displayed when a question is selected. The modal displays information about the question including the question's
 * subject, favorite status, quesiton body, answer, date when it was asked, and rating.  
 * @param {*} props - Default properties, current language state, selected question information and teacher question filtering data.
 */
const QuestionModal = (props) => (
    <Modal
    isOpen = {props.question.subject !== ''}
    onRequestClose = {props.clearSelectedQuestion}
    contentLabel="Question"
    >
    <div className="container">
        <div className="row">
        {
            //Quesiton subject
        }
            <div className="col-sm-10">
                <h2>{props.question.subject}</h2>
            </div>
            {
                //Favoriting star
            }
            <div className="col-sm-1">
                <h3>{props.lang === 'English' ? 'Favorite' : 'Favorita'}: </h3>
            </div>
            <div className="col-sm-1">
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
    {
        //Quesiton body
    }
        <h3>{props.question.question}</h3>
    {
        //Question answer
    }
        {props.question.answer !== '' ? <p>{props.question.answer}</p> : 
        <p>{props.lang === 'English' ? 'This question has not been answered.' : 'Esta pregunta no se ha contestado.'}</p>}
    {
        //Date in which the question was asked
    }
        <h4>{props.lang === 'English' ? 'Date: ' : 'Fecha: '}{props.question.askedDate}</h4>
    {
        //Question rating
    }
        <h4>{props.lang === 'English' ? 'Rate: ': 'Clasificar: '}</h4>
        <StarRatingComponent
            name="rate"
            starCount={5}
            value={props.question.rate}
            onStarClick={(nextValue, prevValue, name) => {props.dispatch(rateQuestion({askedDate: props.question.askedDate, rate: nextValue}))}}
        />
        <br/>
        {
            //Button to close the question modal. 
        }
        <button onClick = {props.clearSelectedQuestion}>{props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
    </Modal>
);

//Map selected question information, value represeting the question's favorite status and the current language state to the component properties. 
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
//Connect component to the controller. 
export default connect(mapStateToProps)(QuestionModal);
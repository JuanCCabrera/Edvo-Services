import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { rateQuestion, addFavoriteQuestion, removeFavoriteQuestion } from '../../actions/teacherQuestions';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import auth0Client from '../../Auth';
import moment from 'moment';

/**
 * Modal displayed when a question is selected. The modal displays information about the question including the question's
 * subject, favorite status, quesiton body, answer, date when it was asked, and rating.  
 * @param {*} props - Default properties, current language state, selected question information and teacher question filtering data.
 */
const QuestionModal = (props) => (
    <div className="modal">
    <Modal
    isOpen = {props.question.subject !== ''}
    onRequestClose = {props.clearSelectedQuestion}
    contentLabel="Question"
    closeTimeoutMS={200}
    className="home-modal-card"
    >
    <div>

    <div className="text-right" style={{paddingBottom: '0', marginBottom: '0'}}>
        <div title={props.lang === 'English' ? 'Mark as favorite' : 'Marcar como favorita'}>
        <StarRatingComponent
            name="favorite"
            starCount={1}
            value={props.isFavorite}
            starColor={'#5933aa'}
            renderStarIcon={(index, value) => {
                return (
                    <span style={{transition: '0.3s'}}>
                    <i className={index <= value ? 'fa fa-star fa-3x' : 'fa fa-star fa-2x'} />
                    </span>
                );
            }}
            onStarClick={() => {
                const favoriteQuestion = !props.question.favorite;
                console.log("THE FAVORITE VALUE IS: ", props.question.favorite);
        console.log("AFTER: ",favoriteQuestion);
        axios.post('https://beta.edvotech.com/api/teacher/questions/favorite',{
                askeddate: props.question.askedDate,
                favorite: favoriteQuestion
            },{
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{
            if(response.data.statusCode == 201){
                console.log("FAV WAS SUCCESSFUL!!!");
        if(props.question.favorite == false){
            props.dispatch(addFavoriteQuestion({askedDate: props.question.askedDate}));
        }else{
            props.dispatch(removeFavoriteQuestion({askedDate: props.question.askedDate}));
        }}});
                
            }}
        />
        </div>
    
    </div>
        {console.log("QUESTION MODAL PROPS: ",props.question.favorite)}
            {
                //Quesiton subject
            }
                <div className="text-center form__title">
                    <p>{props.question.subject}</p>
                    <hr className="break" style={{borderColor: '#5933AA'}}/>
                </div>
                {
                    //Favoriting star
                }
                <div>
                    
                    
                
                </div>
        <div className="teacher-modal-body">
        {
            //Quesiton body
        }
            <div >
            <h3>{props.question.question}</h3>
            <hr/>
            </div>
        {
            //Question answer
        }
            {props.question.answer !== '' ? 

            <div>
                <p className="font-weight-bold">{props.lang === 'English' ? 'Answer:' : 'Contestación:'}</p>
                <p>{props.question.answer}</p> 
            </div>
            : 
            <p>{props.lang === 'English' ? 'This question has not been answered.' : 'Esta pregunta no se ha contestado.'}</p>}
        <br/>
        {
            //Date in which the question was asked
        }
            <h4>{props.lang === 'English' ? 'Date: ' : 'Fecha: '}{moment(props.question.askedDate).format("YYYY-MM-DD")}</h4>
        
        <div className="text-left">
        {
            //Question rating
        }
            <span>{props.lang === 'English' ? 'Rate: ': 'Calificar: '}</span>
            <StarRatingComponent
            name="rate"
            starCount={5}
            starColor={'#ffb400'}
            renderStarIcon={(index, value) => {
                return (
                    <span style={{transition: '0.3s'}}>
                    <i className={index <= value ? 'fa fa-star fa-lg' : 'fa fa-star fa'} />
                    </span>
                );
                }}
            value={props.question.rate}
            onStarClick={(nextValue, prevValue, name) => {
                axios.post('https://beta.edvotech.com/api/teacher/questions/rate',{
                    askeddate: props.question.askedDate,
                    rate: nextValue
                },{
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                }).then(response =>{
                    console.log("AFTER RATING Q: ", response);
                props.dispatch(rateQuestion({askedDate: props.question.askedDate, rate: nextValue}))})}
                }
            />
            <br/>
        </div>
        </div>
            {
                //Button to close the question modal. 
            }
            <div className="text-center">
                <button onClick = {props.clearSelectedQuestion}>
                    <div className="btn btn-item">
                        {props.lang === 'English' ? 'Close' : 'Cerrar'}
                    </div>
                </button>
            </div>
        </div>
    </Modal>
    </div>
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
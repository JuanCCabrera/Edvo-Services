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
                <div onClick={() =>  {
                    console.log("BEFORE: ",props.question.favorite);
                    const favoriteQuestion = !props.question.favorite;
                    console.log("AFTER: ",favoriteQuestion);
                    axios.post('https://beta.edvotech.com/api/teacher/questions/favorite',{
                            askeddate: moment(props.question.askedDate).format("YYYY-MM-DD HH:mm:ss"),
                            favorite: !favoriteQuestion
                        },{
                            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                        }).then(response =>{
                        
                    if(props.question.favorite == true){
                        props.dispatch(addFavoriteQuestion({askedDate: moment(props.question.askedDate).format("YYYY-MM-DD HH:mm:ss")}));
                    }else{
                        props.dispatch(removeFavoriteQuestion({askedDate: moment(props.question.askedDate).format("YYYY-MM-DD HH:mm:ss")}));
                    }});
                }}>
                <div>
                    <h3 style={{display: 'inline'}}>{props.lang === 'English' ? 'Favorite' : 'Favorita'} </h3>
                
                    <StarRatingComponent
                    name="favorite"
                    starCount={1}
                    value={props.isFavorite}
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
        
        {
            //Quesiton body
        }
            <div className="card-title">
            <h3>{props.question.question}</h3>
            </div>
        {
            //Question answer
        }
            {props.question.answer !== '' ? 

            <p>Answer: {props.question.answer}</p> 
            : 
            <p>{props.lang === 'English' ? 'This question has not been answered.' : 'Esta pregunta no se ha contestado.'}</p>}
        {
            //Date in which the question was asked
        }
            <h4>{props.lang === 'English' ? 'Date: ' : 'Fecha: '}{moment(props.question.askedDate).format("YYYY-MM-DD")}</h4>
        {
            //Question rating
        }
            <h4>{props.lang === 'English' ? 'Rate: ': 'Calificar: '}</h4>
            <StarRatingComponent
            name="rate"
            starCount={5}
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
            {
                //Button to close the question modal. 
            }
            <button onClick = {props.clearSelectedQuestion}>
                <div className="btn btn-item">
                    {props.lang === 'English' ? 'Close' : 'Cerrar'}
                </div>
            </button>
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
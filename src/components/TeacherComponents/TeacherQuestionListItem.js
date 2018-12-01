import React from 'react';
import {connect} from 'react-redux';
import {selectQuestion} from '../../actions/teacherQuestions';
import moment from 'moment';
import axios from 'axios';
import auth0Client from '../../Auth';

/**
 * Single item in the Teacher Questions list. Each Teacher Question contains the question's subject, question body, and the date in which the question was asked. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestionListItem = (props) => (
        //Open question modal if the question item is clicked. 
        <div className="clickable list-group-item item-card" onClick={() => {
            if(props.question.read == false){
            axios.post('https://beta.edvotech.com/api/teacher/questions/read', {
                        askeddate: props.question.askedDate
                    },
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
                    .then((response)=>{
                        if(response.status == 201){
                        }
                    });
                }
            props.dispatch(selectQuestion(props.question));}}>
            {
                //Question subject and date in which it was asked.
            }
            <div className="card-title">
            
            <p className="card-text">{props.question.answer && <span style={{color: '#ffb400', fontSize: '45%', position: 'relative', bottom: '3px'}}><i class="fa fa-circle" aria-hidden="true"></i></span>} {props.question.subject}</p>  
            </div>

            {
                //Question date
            }
            
            <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {moment(props.question.askedDate).format("YYYY-MM-DD")}</h5>
            {
               /* //Question body. 
            
            <h5>{props.question.question}</h5>
                */
            }
        </div>
);

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherQuestionListItem);
import React from 'react';
import {connect} from 'react-redux';
import {selectQuestion} from '../../actions/teacherQuestions';
import moment from 'moment';

/**
 * Single item in the Teacher Questions list. Each Teacher Question contains the question's subject, question body, and the date in which the question was asked. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestionListItem = (props) => (
        //Open question modal if the question item is clicked. 
        <div className="clickable list-group-item item-card" onClick={() => {props.dispatch(selectQuestion(props.question));}}>
            {
                //Question subject and date in which it was asked.
            }
            <div className="card-title">
            <p>{props.question.subject}</p> 
            </div>

            {
                //Question date
            }
            
            <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {moment(props.question.askedDate).format("YYYY-MM-DD")}</h5>
            {
                //Question body. 
            }
            <h5>{props.question.question}</h5>
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
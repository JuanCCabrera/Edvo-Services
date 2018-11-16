import React from 'react';
import {connect} from 'react-redux';
import {selectQuestion} from '../../actions/teacherQuestions';

/**
 * Single item in the Teacher Questions list. Each Teacher Question contains the question's subject, question body, and the date in which the question was asked. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestionListItem = (props) => (
        //Open question modal if the question item is clicked. 
        <div className="clickable" onClick={() => {props.dispatch(selectQuestion(props.question));}}>
            {
                //Question subject and date in which it was asked.
            }
            <h4>{props.question.subject}</h4> <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {props.question.askedDate}</h5>
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
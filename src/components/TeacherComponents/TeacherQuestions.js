import React from 'react';
import {connect} from 'react-redux';
import TeacherQuestionsList from './TeacherQuestionsList';
import FavoriteTeacherQuestionsList from './FavoriteTeacherQuestionsList';
import TeacherQuestionFilters from '../Filters/TeacherQuestionFilters';

/**
 * The Teacher Questions page contains a list of questions a teacher has made along with a list of questions the teacher has marked as favorites. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestions = (props) => (
    <div>
    {
        //Teacher Favorites list. 
    }
        <h2>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</h2>
        <FavoriteTeacherQuestionsList/>

    {
        //Teacher Questions list and filters for the list. 
    }
        <h2>{props.lang === 'English' ? 'Questions' : 'Preguntas'}</h2>
        <TeacherQuestionFilters/>
        <TeacherQuestionsList/>
    </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherQuestions);
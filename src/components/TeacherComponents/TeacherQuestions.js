import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import TeacherQuestionsList from './TeacherQuestionsList';
import FavoriteTeacherQuestionsList from './FavoriteTeacherQuestionsList';
import TeacherQuestionFilters from '../Filters/TeacherQuestionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * The Teacher Questions page contains a list of questions a teacher has made along with a list of questions the teacher has marked as favorites. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestions = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:questions-view"
    yes={() => (
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
         )}
         no={() => <Redirect to="/" />}
       />
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherQuestions);

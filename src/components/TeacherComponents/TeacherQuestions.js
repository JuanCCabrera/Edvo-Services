import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import TeacherQuestionsList from './TeacherQuestionsList';
import FavoriteTeacherQuestionsList from './FavoriteTeacherQuestionsList';
import TeacherQuestionFilters from '../Filters/TeacherQuestionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

const TeacherQuestions = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:questions-view"
    yes={() => (
    <div>
        <h2>{props.lang === 'English' ? 'Questions' : 'Preguntas'}</h2>
        <TeacherQuestionFilters/>
        <TeacherQuestionsList/>

        <h2>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</h2>
        <FavoriteTeacherQuestionsList/>
    </div>
         )}
         no={() => <Redirect to="/" />}
       />
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherQuestions);

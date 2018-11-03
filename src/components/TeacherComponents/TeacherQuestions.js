import React from 'react';
import {connect} from 'react-redux';
import TeacherQuestionsList from './TeacherQuestionsList';
import FavoriteTeacherQuestionsList from './FavoriteTeacherQuestionsList';

const TeacherQuestions = (props) => (
    <div>
        <h2>{props.lang === 'English' ? 'Questions' : 'Preguntas'}</h2>
        <TeacherQuestionsList/>

        <h2>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</h2>
        <FavoriteTeacherQuestionsList/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherQuestions);
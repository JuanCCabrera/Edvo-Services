import React from 'react';
<<<<<<< HEAD

const TeacherQuestions = (props) => (
    <div>
        TEACHER QUESTIONS
    </div>
);

export default TeacherQuestions;
=======
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
>>>>>>> origin/JCCFrontEnd

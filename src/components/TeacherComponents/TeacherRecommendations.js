import React from 'react';
<<<<<<< HEAD

const TeacherRecommendations = (props) => (
    <div>
        TEACHER RECOMMENDATIONS
    </div>
);

export default TeacherRecommendations;
=======
import {connect} from 'react-redux';
import TeacherRecommendationsList from './TeacherRecommendationsList';
import FavoriteRecommendationsList from './FavoriteRecommendationsList';

const TeacherRecommendations = (props) => (
    <div>
        {
            //Recommendations List
            //Favorite Recommendations List
            //Quizzes NavLink
        }
        <h2>{props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</h2>
        <TeacherRecommendationsList/>

        <h2>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</h2>
        <FavoriteRecommendationsList/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherRecommendations);
>>>>>>> origin/JCCFrontEnd

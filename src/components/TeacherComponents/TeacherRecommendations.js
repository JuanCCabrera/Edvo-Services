import React from 'react';
import {connect} from 'react-redux';
import TeacherRecommendationsList from './TeacherRecommendationsList';
import FavoriteRecommendationsList from './FavoriteRecommendationsList';
import TeacherRecommendationsFilters from '../Filters/TeacherRecommendationsFilters';

const TeacherRecommendations = (props) => (
    <div>
        {
            //Recommendations List
            //Favorite Recommendations List
            //Quizzes NavLink
        }
        <h2>{props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</h2>
        <TeacherRecommendationsFilters/>
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
import React from 'react';
import {connect} from 'react-redux';
import TeacherRecommendationsList from './TeacherRecommendationsList';
import FavoriteRecommendationsList from './FavoriteRecommendationsList';
import TeacherRecommendationsFilters from '../Filters/TeacherRecommendationsFilters';

/**
 * Teacher Recommendations page layout. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherRecommendations = (props) => (
    <div>
        {
            //Recommendations List and list filters
        }
        <h2>{props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</h2>
        <TeacherRecommendationsFilters/>
        <TeacherRecommendationsList/>

        {
            //Favorite Recommendations list
        }
        <h2>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</h2>
        <FavoriteRecommendationsList/>
    </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherRecommendations);
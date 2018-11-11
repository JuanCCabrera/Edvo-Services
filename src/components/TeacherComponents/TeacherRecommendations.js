import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import TeacherRecommendationsList from './TeacherRecommendationsList';
import FavoriteRecommendationsList from './FavoriteRecommendationsList';
import TeacherRecommendationsFilters from '../Filters/TeacherRecommendationsFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

const TeacherRecommendations = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:recommendations-view"
    yes={() => (
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
         )}
         no={() => <Redirect to="/" />}
       />
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherRecommendations);

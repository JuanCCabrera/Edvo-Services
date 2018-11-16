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
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    {
                        //Favorite Recommendations list
                    }
                    <div className="text-center pending__title__2">
                        <p>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</p>
                        <hr className="break"/>
                    </div> 
                    <FavoriteRecommendationsList/>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-7">

                {
                    //Recommendations List and list filters
                }
                <div className="text-center pending__title__2">
                <p>{props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</p>
                <hr className="break"/>
                </div>
                <TeacherRecommendationsFilters/>
                <TeacherRecommendationsList/>
                </div>
            </div>
        </div>
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
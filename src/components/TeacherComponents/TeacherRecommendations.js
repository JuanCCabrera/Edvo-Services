import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import TeacherRecommendationsList from './TeacherRecommendationsList';
import FavoriteRecommendationsList from './FavoriteRecommendationsList';
import TeacherRecommendationsFilters from '../Filters/TeacherRecommendationsFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * Teacher Recommendations page layout. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherRecommendations = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:recommendations-view"
    yes={() => (
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
                    <div className="text-center">
                        <h1 className="form__title">{props.lang === 'English' ? 'View Quizzes' : 'Ver Pruebas'}</h1>
                        <Link to={'/teacher/quizzes'}>
                            <button>
                                <div className="btn quiz_button">
                                    <i className="fa fa-question-circle fa-5x" aria-hidden="true"></i>
                                </div>
                            </button>
                        </Link>
                    </div>
                    
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
         )}
         no={() => <Redirect to="/login" />}
       />
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherRecommendations);

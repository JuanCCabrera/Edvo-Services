import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * Manage Recommendations page layout. 
 * @param {*} props - Default properties
 */
const ManageRecommendations = (props) => (
    //Authenticate user information to grant access to the Manage Recommendations page. 
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-manage"
    yes={() => (
    <div className="background-home">
        <div className = "container">
            <div className="row">
                <div className="col-sm-2 ">
                {
                    //Recommendations Button List
                }
                    <div className="text-center well">
                        <RecommendationButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                    {
                        //Page title
                    }
                    <div className="text-center pending__title__2">
                        <div className="spec__mobile__font">
                            {props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}
                        </div>
                        <hr className="break"/>
                        {
                            //Recommendations list with recommendations filters. 
                        }
                    </div>
                    <RecommendationsFilters/>
                    <ManageRecommendationsList/>
                </div>
            </div>
        </div>
    </div>
                             )}
                             //Redirect user to login page if not authorized. 
                             no={() => <Redirect to="/login" />}
                           />
);

//Map language settings to component properties. 
const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

//Connect component to central controller. 
export default connect(mapStateToProps)(ManageRecommendations);
import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';
import {connect} from 'react-redux';

/**
 * Manage Recommendations page layout. 
 * @param {*} props - Default properties
 */
const ManageRecommendations = (props) => (
    <div className="background-home">
        <div className = "container">
            <div className="row">
                <div className="col-sm-2 ">
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
                        <p>{props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</p>
                        <hr className="break"/>
                    </div>
                    <RecommendationsFilters/>
                    <ManageRecommendationsList/>
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ManageRecommendations);
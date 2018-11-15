import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';

/**
 * Manage Recommendations page layout. 
 * @param {*} props - Default properties
 */
const ManageRecommendations = (props) => (
    <div className = "container">
        <div className="row">
            <div className="col-sm-2 text-center well">
                <RecommendationButtonList/>
            </div>
            <div className="col-sm-1"/>
            <div className="col-sm-9 big-card">
                <RecommendationsFilters/>
                <ManageRecommendationsList/>
            </div>
        </div>
    </div>
);

export default ManageRecommendations;
import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';

/**
 * Manage Recommendations page layout. 
 * @param {*} props - Default properties
 */
const ManageRecommendations = (props) => (
    <div>
        <RecommendationButtonList/>
        <RecommendationsFilters/>
        <ManageRecommendationsList/>
    </div>
);

export default ManageRecommendations;
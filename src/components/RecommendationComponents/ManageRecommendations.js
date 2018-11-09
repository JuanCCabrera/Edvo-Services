import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';

const ManageRecommendations = (props) => (
    <div>
        <RecommendationButtonList/>
        <RecommendationsFilters/>
        <ManageRecommendationsList/>
    </div>
);

export default ManageRecommendations;
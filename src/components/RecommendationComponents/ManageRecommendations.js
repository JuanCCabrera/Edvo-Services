import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';

const ManageRecommendations = (props) => (
    <div>
        <RecommendationButtonList/>
        <ManageRecommendationsList/>
    </div>
);

export default ManageRecommendations;
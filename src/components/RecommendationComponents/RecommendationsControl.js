import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import AssignRecommendations from './AssignRecommendations';

const RecommendationsControl = (props) => (
    <div>
        <RecommendationButtonList/>
        <AssignRecommendations/>
    </div>
);

export default RecommendationsControl;
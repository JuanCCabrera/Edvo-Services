import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import AssignRecommendations from './AssignRecommendations';

const RecommendationsControl = (props) => (
    <div className = "container">
        <div className="row">
            <div className="col-sm-1"/>
            <div className="col-sm-1 text-center">
                <RecommendationButtonList/>
            </div>
            <div className="col-sm-1"/>
            <div className="col-sm-9">
                <AssignRecommendations/>
            </div>
        </div>
    </div>
);

export default RecommendationsControl;
import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import AssignRecommendations from './AssignRecommendations';

/**
 * The Recommendations page is the entry point for pages that deal with the management of recommendations by Mentors and Administrators. 
 * @param {*} props - Default properties
 */
const RecommendationsControl = (props) => (
    <div className="background-home">
        <div className = "container">
            <div className="row">
                <div className="col-sm-1">
                {
                    //Recommendations Button List
                }
                    <div className="text-center well">
                        <RecommendationButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                {
                    //Assign Recommendations layout
                }
                <div className="col-sm-10">
                    <AssignRecommendations/>
                </div>
            </div>
        </div>
    </div>
);

export default RecommendationsControl;
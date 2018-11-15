import React from 'react';
import {connect} from 'react-redux';
import HomeRecommendationsListItem from './HomeRecommendationsListItem';

/**
 * The Recent Recommendations List contains a list of the three most recently assign recommendations. 
 * @param {*} props - Default properties, loaded list of most recent recommendations and current language state. 
 */
const RecentRecommendationsList = (props) => (
    <div>
    {
        //Map most recent recommendations to the list
    }
        {props.recommendation.map((reco) => {
            return <HomeRecommendationsListItem key={reco.recoID} reco={reco}/>
        })}

    {
        //Display message if there are no items on the list
    }
        {(props.recommendation.length === 0) && (props.lang === 'English' ?
            <div>
                <p>You do not have any assigned recommendations.</p>
            </div>
            :
            <div>
                <p>Usted no tiene recomendaciones asignadas.</p>
            </div>
        )}
    </div>
);

//Map 3 most recent recommendations and the current language state to the component. 
const mapStateToProps = (state) => {
    return{
        recommendation: state.teacherMetrics.mostRecentrecommendations,
        lang: state.language.lang
    }
}

//Connect the component to the controller. 
export default connect(mapStateToProps)(RecentRecommendationsList);
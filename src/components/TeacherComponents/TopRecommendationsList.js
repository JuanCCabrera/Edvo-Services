import React from 'react';
import {connect} from 'react-redux';
import HomeRecommendationsListItem from './HomeRecommendationsListItem';

/**
 * The Top Recommendations list contains the three top-rated recommendations of a Teacher user. 
 * @param {*} props - Default properties
 */
const TopRecommendationsList = (props) => (
    <div>
    {
        //Top Recommendations list items
    }
        {props.recommendation.map((reco) => {
            return <HomeRecommendationsListItem key={reco.recoID} reco={reco}/>
        })}

    {
        //Message displayed if there are no items in the Top Recommendations list. 
    }
        <div className="text-center">
        {(props.recommendation.length === 0) && (props.lang === 'English' ?
            <div>
                <hr/>
                <p>You do not have any rated recommendations.</p>
            </div>
            :
            <div>
                <hr/>
                <p>Usted no tiene recomendaciones calificadas.</p>
            </div>
        )}
        </div>
    </div>
);

//Map top recommendations' information and current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        recommendation: state.teacherMetrics.topRecommendations,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TopRecommendationsList);
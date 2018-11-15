import React from 'react';
import {connect} from 'react-redux';
import TeacherRecommendationsListItem from './TeacherRecommendationsListItem';

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
            console.log("SENDING PROPS OF RECO: ", reco)
            return <TeacherRecommendationsListItem key={reco.recoID} rating={reco.rating} reco={reco}/>
        })}

    {
        //Message displayed if there are no items in the Top Recommendations list. 
    }
        {(props.recommendation.length === 0) && (props.lang === 'English' ?
            <div>
                <p>You do not have any rated recommendations.</p>
            </div>
            :
            <div>
                <p>Usted no tiene recomendaciones clasificadas.</p>
            </div>
        )}
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
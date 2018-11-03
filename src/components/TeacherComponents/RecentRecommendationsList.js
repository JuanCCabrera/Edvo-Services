import React from 'react';
import {connect} from 'react-redux';
import TeacherRecommendationsListItem from './TeacherRecommendationsListItem';

const RecentRecommendationsList = (props) => (
    <div>
        {props.recommendation.map((reco) => {
            return <TeacherRecommendationsListItem key={reco.recoID} reco={reco}/>
        })}

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

const mapStateToProps = (state) => {
    return{
        recommendation: state.teacherMetrics.mostRecentrecommendations,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecentRecommendationsList);
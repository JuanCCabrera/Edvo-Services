import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { editRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

const EditRecommendation = (props) => (
    <div>
        <RecommendationButtonList/>
        <h2> Edit Recommendation </h2>
        <CreateRecommendationForm 
        reco={props.recommendation}
        onSubmit={(recommendation) => {
            props.dispatch(editRecommendation(props.recommendation.id, recommendation));
            props.history.push('/recommendations/manage');
        }}/>
    </div>
);

const mapStateToProps = (state, props) => {
    return{
        recommendation: state.recommendations.find((reco) => {
            return reco.id === props.match.params.id;
        })
    };
};

export default connect(mapStateToProps)(EditRecommendation);
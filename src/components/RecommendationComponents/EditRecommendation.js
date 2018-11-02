import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { editRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

const EditRecommendation = (props) => (
    <div>
        <RecommendationButtonList/>
        <h2> {props.lang === 'English' ? 'Edit Recommendation' : 'Modificar Recomendación'} </h2>
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
        }),
        lang: state.language.lang
    };
};

export default connect(mapStateToProps)(EditRecommendation);
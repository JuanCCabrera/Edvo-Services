import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { createRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

const NewRecommendation = (props) => (
    <div>
        <RecommendationButtonList/>
        <h2> Create Recommendation </h2>
        <CreateRecommendationForm onSubmit={(recommendation) => {
            props.dispatch(createRecommendation(recommendation));
        }}/>
    </div>
);

export default connect()(NewRecommendation);
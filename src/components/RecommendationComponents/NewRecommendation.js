import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { createRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

const NewRecommendation = (props) => (
    <div>
        <RecommendationButtonList/>
        <h2> {props.lang === 'English' ? 'Create Recommendation' : 'Crear Recomendación'} </h2>
        <CreateRecommendationForm onSubmit={(recommendation) => {
            props.dispatch(createRecommendation(recommendation));
        }}/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(NewRecommendation);
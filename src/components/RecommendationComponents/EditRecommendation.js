import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { editRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

/**
 * The Edit Recommendations page contains links to access all Recommendations Control pages and a version of the Create Recommendation form
 * which is prefilled with recommendation data. It also has the quiz question and answer options disabled (cannot be modified). 
 * @param {*} props - Default properties, recommendation which matches the URL user id and the current language state. 
 */
const EditRecommendation = (props) => (
    <div>
        {
            //Recommendations button list
        }
        <RecommendationButtonList/>
        {
            //Page title
        }
        <h2> {props.lang === 'English' ? 'Edit Recommendation' : 'Modificar Recomendación'} </h2>
        {
            //Create Recommendation form with preset recommendation data (editable recommendation). 
        }
        <CreateRecommendationForm 
        reco={props.recommendation}
        isEdit={true}
        onSubmit={(recommendation) => {
            props.dispatch(editRecommendation(props.recommendation.id, recommendation));
            props.history.push('/recommendations/manage');
        }}/>
    </div>
);

//Map recommendation with ID matching URL id parameter and the current language state. 
const mapStateToProps = (state, props) => {
    return{
        recommendation: state.recommendations.find((reco) => {
            return reco.id === props.match.params.id;
        }),
        lang: state.language.lang
    };
};

//Connect component to controller. 
export default connect(mapStateToProps)(EditRecommendation);
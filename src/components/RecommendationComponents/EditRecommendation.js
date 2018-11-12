import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { editRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

const EditRecommendation = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-modify"
    yes={() => (
    <div>
        
    {console.log("PROPS EDIT:L ", props)}
        <RecommendationButtonList/>
        <h2> {props.lang === 'English' ? 'Edit Recommendation' : 'Modificar Recomendación'} </h2>
        <CreateRecommendationForm 
        reco={props.recommendation}
        onSubmit={(recommendation) => {
            props.dispatch(editRecommendation(props.recommendation.id, recommendation));
            props.history.push('/recommendations/manage');
        }}/>
    </div>
                         )}
                         no={() => <Redirect to="/" />}
                       />
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
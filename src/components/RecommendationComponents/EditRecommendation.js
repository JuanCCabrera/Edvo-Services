import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { editRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * The Edit Recommendations page contains links to access all Recommendations Control pages and a version of the Create Recommendation form
 * which is prefilled with recommendation data. It also has the quiz question and answer options disabled (cannot be modified). 
 * @param {*} props - Default properties, recommendation which matches the URL user id and the current language state. 
 */
const EditRecommendation = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-modify"
    yes={() => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-2 text-center well">
        {
            //Recommendations button list
        }
        <RecommendationButtonList/>
        </div>
        <div className="col-sm-1"/>
            <div className="col-sm-9 big-card">
                <div className="form__title">
                    {
                        //Page title
                    }
                    <p> {props.lang === 'English' ? 'Edit Recommendation' : 'Modificar Recomendación'} </p>
                    <hr className="break" style={{borderColor: '#5933AA'}}/>
                </div>
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
            </div>
        </div>
    </div>
                         )}
                         no={() => <Redirect to="/" />}
                       />
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
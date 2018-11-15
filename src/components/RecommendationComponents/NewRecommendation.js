import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import { createRecommendation } from '../../actions/recommendations';
import {connect} from 'react-redux';

/**
 * New Recommendation page / Create Recommendation page. Here, a new recommendation can be created and submitted to the database. 
 * @param {*} props - Default properties and current language state. 
 */
const NewRecommendation = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-sm-2 text-center well">
                {
                    //Links to traverse the Recommendations Control page. 
                }
                    <RecommendationButtonList/>
            </div>
            <div className="col-sm-1"/>
            <div className="col-sm-9">
                    {
                        //Page title
                    }
                        <h2> {props.lang === 'English' ? 'Create Recommendation' : 'Crear Recomendación'} </h2>
                    {
                        //Form to create a new recommendation
                    }
                        <CreateRecommendationForm isEdit={false} onSubmit={(recommendation) => {
                            props.dispatch(createRecommendation(recommendation));
                        }}/>
            </div>
        </div>
    </div>
);

//Map current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to the controller. 
export default connect(mapStateToProps)(NewRecommendation);
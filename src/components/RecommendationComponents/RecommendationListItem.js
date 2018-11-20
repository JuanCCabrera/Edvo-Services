import React from 'react';
import {connect} from 'react-redux';
import { selectRecommendation } from '../../actions/assignRecommendations';
import {selectAssignmentRecommendationToDisplay} from '../../actions/assignmentRecommendationModal';

/**
 * Single list item of the Recommendations List. 
 * @param {*} props - Default properties and the current language state. The object model for a recommendation follows: 
 recommendation: {
        id: '',
        title: '',
        multimedia: '',
        header: '',
        description: '',
        teachingStrategies: false,
        updatedMaterial: false,
        timeManagement: false,
        technologyIntegration: false,
        instructionAlignment: false,
        moodle: false,
        googleClassroom: false,
        emailResource: false,
        applications: false,
        books: false,
        socialMedia: false,
        projector: false,
        computer: false,
        tablet: false,
        stylus: false,
        internet: false,
        smartboard: false,
        smartpencil: false,
        speakers: false,
        topics: [],
        location: '',
        subject: '',
        language: 'english',
        type: 'event',
        schoolType: 'public'
        format: ''
        groupSize: '',
        level: '',
        mentorID: '',
        question: '',
        choices: [],
        correctChoice: 0
    }
 */
const RecommendationListItem = (props) => (
        <div className="list-group-item">
            <div className="row">
                <div className="col-sm-10 card-title">
                    {
                        //Recommendation title
                    }
                    <p>
                        {props.reco.title} 
                    </p>
                </div>
                <div className="col-sm-2">
                    <p>
                        {props.reco.id === props.selectedRecommendation && 
                        <div>
                            <span style={{display: 'inline'}}><i className="fa fa-check-circle" style={{color: 'green'}} aria-hidden="true"></i></span>
                        </div>}
                    </p>
                </div>
            </div>
        {
            //Recommendation header
        }
        <div className="item__body">
            <h5>{props.reco.header}</h5>
        </div>
        {
            //Button to select a recommendation
        }
        <button onClick={() => {
            props.dispatch(selectRecommendation({recoID: props.reco.id}));
        }}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'Select' : 'Seleccionar'}
            </div>
        </button>

        <button onClick={() => {
            props.dispatch(selectAssignmentRecommendationToDisplay(props.reco));
        }}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'View Recommendation Informacion' : 'Ver Más Información'}
            </div>
        </button>
    </div>
);

//Map current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(RecommendationListItem);
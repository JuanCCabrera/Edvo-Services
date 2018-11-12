import React from 'react';
import {connect} from 'react-redux';
import { selectRecommendation } from '../../actions/assignRecommendations';

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
    <div>
        {
            //Recommendation title
        }
        <h4>{props.reco.title} {props.reco.id === props.selectedRecommendation && '[X]'}</h4>
        {
            //Recommendation header
        }
        <h5>{props.reco.header}</h5>
        {
            //Button to select a recommendation
        }
        <button onClick={() => {
            props.dispatch(selectRecommendation({recoID: props.reco.id}));
        }}>{props.lang === 'English' ? 'Select' : 'Seleccionar'}</button>
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
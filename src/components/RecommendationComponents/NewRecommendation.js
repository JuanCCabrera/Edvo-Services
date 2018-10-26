import React from 'react';
import RecommendationButtonList from './RecommendationButtonList';
import CreateRecommendationForm from './CreateRecommendationForm';
import {createRecommendation} from '../../actions/recommendations';
import {connect} from 'react-redux';

const NewRecommendation = (props) => (
    <div>
        <RecommendationButtonList/>
        <CreateRecommendationForm onSubmit={(newRecommendation) => {
            props.dispatch(createRecommendation(newRecommendation));
            }}/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        title: state.title,
        multimedia: state.multimedia,
        header: state.header,
        description: state.description,

        teachingStrategies: state.teachingStrategies,
        updatedMaterial: state.updatedMaterial,
        timeManagement: state.timeManagement,
        technologyIntegration: state.technologyIntegration,
        instructionAlignment: state.instructionAlignment,

        moodle: state.moodle,
        googleClassroom: state.googleClassroom,
        emailResource: state.emailResource,
        books: state.books,
        socialMedia: state.socialMedia,
        projector: state.projector,
        computer: state.computer,
        tablet: state.tablet,
        stylus: state.stylus,
        internet: state.internet,
        smartboard: state.smartboard,
        smartpencil: state.smartpencil,
        speakers: state.speakers,
        
        topics: state.topics,
        location: state.location,
        subject: state.subject,
        language: state.language,
        type: state.type,
        schoolType: state.schoolType,
        format: state.format,
        level: state.level,
        size: state.size,

        question: state.question,
        choices: state.choices,
        correctOption: state.correctOption
    }
} 

export default connect(mapStateToProps)(NewRecommendation);
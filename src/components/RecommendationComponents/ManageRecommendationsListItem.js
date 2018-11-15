import React from 'react';
import {connect} from 'react-redux';
import { removeRecommendation } from '../../actions/recommendations';
import {Link} from 'react-router-dom';

/**
 * Single item of the Recommendations List
 * @param {*} props - Recommendations list item information following the object model below:
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
}
 */
const ManageRecommendationsListItem = (props) => (
    <div>
    {
        //Recommendation title
    }
        <h4>{props.reco.title}</h4>
    {
        //Recommendation header
    }
        <h5>{props.reco.header}</h5>
    {
        //Button to remove recommendation
    }
        <button onClick={() => {
            props.dispatch(removeRecommendation({id: props.reco.id}));
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    {
        //Link to edit the recommendation item
    }
        <Link to={`/recommendations/edit/${props.reco.id}`}><button>{props.lang === 'English' ? 'Edit' : 'Modificar'}</button></Link>
    </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(ManageRecommendationsListItem);
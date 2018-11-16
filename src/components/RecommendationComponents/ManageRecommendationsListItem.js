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
    <div className="item-card">
    {
        //Recommendation title
    }
        <p className="item__body card-title">{props.reco.title}</p>
    {
        //Recommendation header
    }
        <p className="item__body">{props.reco.header}</p>
    {
        //Link to edit the recommendation item
    }
        <Link to={`/recommendations/edit/${props.reco.id}`}>
            <button>
                <div className="btn btn-item">
                    {props.lang === 'English' ? 'Edit' : 'Modificar'}
                </div>
            </button>
        </Link>
    {
        //Button to remove recommendation
    }
        
        <button onClick={() => {
            props.dispatch(removeRecommendation({id: props.reco.id}));
        }}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'Remove' : 'Remover'}
            </div>
        </button>
    
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
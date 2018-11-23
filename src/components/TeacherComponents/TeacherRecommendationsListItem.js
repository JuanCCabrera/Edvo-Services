import React from 'react';
import {connect} from 'react-redux';
import {selectRecommendation} from '../../actions/teacherRecommendations';
import moment from 'moment';

/**
 * Single item of the Teacher Recommendations list. It contains the recommendation's title, date of assignment and header. 
 * @param {*} props - Default properties and the current language state. 
 */
const TeacherRecommendationsListItem = (props) => (
    //Open recommendation modal when recommendation item is selected. 
        <div className="clickable list-group-item item-card" onClick={() => {props.dispatch(selectRecommendation(props.reco));}}>
        {
            //Recommendation title and date of assignment. 
        }
            <div className="card-title">
                <p>{props.reco.title}</p>
            </div>
            
            <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {moment(props.reco.date).format("YYYY-MM-DD")}</h5>
        {
            //Recommendation header
        }
            <h5>{props.reco.header}</h5>
        </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherRecommendationsListItem);
import React from 'react';
import {connect} from 'react-redux';
import {selectRecommendation} from '../../actions/teacherRecommendations';

const TeacherRecommendationsListItem = (props) => (
        <div onClick={() => {props.dispatch(selectRecommendation(props.reco));}}>
            <h4>{props.reco.title}</h4> <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {props.reco.date}</h5>
            <h5>{props.reco.header}</h5>
        </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherRecommendationsListItem);
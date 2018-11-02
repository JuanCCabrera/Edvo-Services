import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const RecentRecommendationsListItem = (props) => (
    <div>
    <Link to={`/teacher/recommendation/${props.recoID}`}>
        <h4>{props.reco.title}</h4> <h5>Date: {props.reco.date}</h5>
        <h5>Description: {props.reco.header}</h5>
    </Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecentRecommendationsListItem);
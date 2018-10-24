import React from 'react';
import {connect} from 'react-redux';
import { selectRecommendation } from '../../actions/assignRecommendations';

const RecommendationListItem = (props) => (
    <div>
        <h4>{props.reco.title} {props.reco.id === props.selectedRecommendation && '[X]'}</h4>
        <h5>{props.reco.header}</h5>
        <button onClick={() => {
            props.dispatch(selectRecommendation({recoID: props.reco.id}));
        }}>Select</button>
    </div>
);

export default connect()(RecommendationListItem);
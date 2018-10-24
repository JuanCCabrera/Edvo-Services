import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import { selectUser } from '../../actions/assignRecommendations';

const RecommendationsUserListItem = (props) => (
    <div>
        <h4>{props.user.name + ' ' + props.user.lastName} {props.user.id === props.selectedUser && '[X]'}</h4>
        <h5>Email: {props.user.email}</h5>
        {
            //<h6>Has weekly recommendation: {props.user.weeklyReco ? 'Yes' : 'No'}</h6>
        }
        <h6>Categories: {' '}
        {props.user.categories.map((category) => {
            return (<span key={uuid()}>{category + ' '}</span>)
        })}
        </h6>
        <button onClick={() => {
            props.dispatch(selectUser({userID: props.user.id}));
        }}>Select</button>
    </div>
);

export default connect()(RecommendationsUserListItem);
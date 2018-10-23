import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeUser} from '../actions/user';

const UserListItem = (props) => (
    <div>
        <h3>{props.user.name + ' ' + props.user.lastName}</h3>
        <button onClick={() => {
            props.dispatch(removeUser({id: props.user.id}));
        }}>Remove</button>
        <h6>Has weekly recommendation: {props.user.weeklyReco ? 'Yes' : 'No'}</h6>
        <h6>Categories: {' '}
        {props.user.categories.map((category) => {
            return (<span key={uuid()}>{category + ' '}</span>)
        })}
        </h6>
    </div>
);

export default connect()(UserListItem);
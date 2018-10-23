import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeSchool} from '../actions/school';

const SchoolListItem = (props) => (
    <div>
        <h4>{props.school.name}</h4>
        <h5>Location: {props.school.location}</h5>
        <h5>Type: {props.school.type}</h5>
        <h5>Accounts Linked: {props.school.numAccounts}</h5>
        <button onClick={() => {
            props.dispatch(removeSchool({id: props.school.id}));
        }}>Remove</button>
    </div>
);

export default connect()(SchoolListItem);
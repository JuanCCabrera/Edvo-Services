import React from 'react';
import {connect} from 'react-redux';

const ClassListItem = (props) => (
    <div>
        <h4>{props.class.subject}</h4>
        <p>Format: {props.class.format}</p>
        <p>Language: {props.class.language}</p>
        <p>Level: {props.class.level}</p>
        <p>Group Size: {props.class.groupSize} students</p>
        {!(props.class.topicA === '' && props.class.topicB === '' && props.class.topicC === '') && <p>Class Topics: <br/></p>}
        <ol>
            {props.class.topicA !== '' && <li>{props.class.topicA}</li>}
            {props.class.topicB !== '' && <li>{props.class.topicB}</li>}
            {props.class.topicC !== '' && <li>{props.class.topicC}</li>}
        </ol>
    </div>
);

export default connect()(ClassListItem);

/*
    class: {
        userId: '',
        classInfoId: '',
        subject: '',
        format: '',
        language: '',
        level: '',
        groupSize: '',
        topicA: '',
        topicB: '',
        topicC: '',
    }
*/
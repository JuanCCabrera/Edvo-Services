import React from 'react';
import {connect} from 'react-redux';
import { removeClass } from '../../actions/classes';

const ClassListItem = (props) => (
    <div>
        <h4>{props.class.subject}</h4>
        <p>{props.lang === 'English' ? 'Format' : 'Formato'}: {props.class.format}</p>
        <p>{props.lang === 'English' ? 'Language' : 'Lenguaje'}: {props.class.language}</p>
        <p>{props.lang === 'English' ? 'Level' : 'Nivel'}: {props.class.level}</p>
        <p>{props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {props.class.groupSize} {props.lang === 'English' ? 'students' : 'estudiantes'}</p>
        {!(props.class.topicA === '' && props.class.topicB === '' && props.class.topicC === '') && <p>{props.lang === 'English' ? 'Class Topics' : 'Tópicos de Clase'}: <br/></p>}
        <ol>
            {props.class.topicA !== '' && <li>{props.class.topicA}</li>}
            {props.class.topicB !== '' && <li>{props.class.topicB}</li>}
            {props.class.topicC !== '' && <li>{props.class.topicC}</li>}
        </ol>
        <button disabled={props.classes.length === 1} onClick={() => {props.dispatch(removeClass({classInfoId: props.class.classInfoId}))}}>Remove</button>
    </div>
);

const mapStateToProps = (state,props) => {
    return {
        classes: state.classes,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ClassListItem);

/* Class Object Contents
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
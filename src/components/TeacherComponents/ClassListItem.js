import React from 'react';
import {connect} from 'react-redux';
import { removeClass } from '../../actions/classes';

/**
 * A class list item is a single item of the Class List. It contains the class subject, format, langauge, level, group size, and topics. 
 * It also contains a button to remove the class at the bottom of each item. 
 * @param {*} props - Contains default properties, class information and the current langauge state.
 */
const ClassListItem = (props) => (
    <div className="list-group-item">
    {
        //Class subject
    }
        <h4 className="card-title">{props.class.subject}</h4>
    {
        //Class format
    }
        <p>{props.lang === 'English' ? 'Format' : 'Formato'}: {props.class.format}</p>
    {
        //Class language
    }
        <p>{props.lang === 'English' ? 'Language' : 'Lenguaje'}: {props.class.language}</p>
    {
        //Class level
    }
        <p>{props.lang === 'English' ? 'Level' : 'Nivel'}: {props.class.level}</p>
    {
        //Class group size
    }
        <p>{props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {props.class.groupSize} {props.lang === 'English' ? 'students' : 'estudiantes'}</p>
    {
        //Topics list
    }
        {!(props.class.topicA === '' && props.class.topicB === '' && props.class.topicC === '') && <p>{props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}: <br/></p>}
        <ol>
            {props.class.topicA !== '' && <li>{props.class.topicA}</li>}
            {props.class.topicB !== '' && <li>{props.class.topicB}</li>}
            {props.class.topicC !== '' && <li>{props.class.topicC}</li>}
        </ol>
    {
        //Remove class button
    }
        <button disabled={props.classes.length === 1} onClick={() => {props.dispatch(removeClass({classInfoId: props.class.classInfoId}))}}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'Remove' : 'Remover'}
            </div>
        </button>
    </div>
);

//Map list of classes and current language state to the component properties. 
const mapStateToProps = (state,props) => {
    return {
        classes: state.classes,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
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
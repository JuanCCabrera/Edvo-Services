import React from 'react';
import {connect} from 'react-redux';
import { removeClass } from '../../actions/classes';

/**
 * A class list item is a single item of the Class List. It contains the class subject, format, langauge, level, group size, and topics. 
 * It also contains a button to remove the class at the bottom of each item. 
 * @param {*} props - Contains default properties, class information and the current langauge state.
 */
class ClassListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleButton: false
        }
    }
    render() {
        return (
    <div className="list-group-item">
    {
        //Class subject
    }
        <h4 className="card-title">{this.props.classes.subject}</h4>
    {
        //Class format
    }
        <p>{this.props.lang === 'English' ? 'Format' : 'Formato'}: {this.props.classes.format}</p>
    {
        //Class language
    }
        <p>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}: {this.props.classes.language}</p>
    {
        //Class level
    }
        <p>{this.props.lang === 'English' ? 'Level' : 'Nivel'}: {this.props.classes.level}</p>
    {
        //Class group size
    }
        <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.classes.groupSize} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
    {
        //Topics list
    }
        {!(this.props.classes.topicA === '' && this.props.classes.topicB === '' && this.props.classes.topicC === '') && <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}: <br/></p>}
        <ol>
            {this.props.classes.topicA !== '' && <li>{this.props.classes.topicA}</li>}
            {this.props.classes.topicB !== '' && <li>{this.props.classes.topicB}</li>}
            {this.props.classes.topicC !== '' && <li>{this.props.classes.topicC}</li>}
        </ol>
    {
        //Remove class button
    }
        
    </div>
    );
    }
}

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
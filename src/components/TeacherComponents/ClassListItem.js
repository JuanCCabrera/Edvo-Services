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
        <h4 className="card-title">{this.props.class.subject}</h4>
    {
        //Class format
    }
        <p>{this.props.lang === 'English' ? 'Format' : 'Formato'}: {this.props.class.format}</p>
    {
        //Class language
    }
        <p>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}: {this.props.class.language}</p>
    {
        //Class level
    }
        <p>{this.props.lang === 'English' ? 'Level' : 'Nivel'}: {this.props.class.level}</p>
    {
        //Class group size
    }
        <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.class.groupSize} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
    {
        //Topics list
    }
        {!(this.props.class.topicA === '' && this.props.class.topicB === '' && this.props.class.topicC === '') && <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}: <br/></p>}
        <ol>
            {this.props.class.topicA !== '' && <li>{this.props.class.topicA}</li>}
            {this.props.class.topicB !== '' && <li>{this.props.class.topicB}</li>}
            {this.props.class.topicC !== '' && <li>{this.props.class.topicC}</li>}
        </ol>
    {
        //Remove class button
    }
        {this.props.classes.length === 1 ? 
            <div>
            </div> 
            : 
            <div>
                    {this.state.toggleButton ? 
            <div>
                <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                    {this.props.lang === 'English' ? 'Are you sure you would like to remove this class?' : '¿Estás seguro de que quieres remover a este curso?'}
                </div>
                <br/>
                <button onClick={() => {
                    this.props.dispatch(removeClass({classInfoId: this.props.class.classInfoId})); ; 
                    this.setState(() => ({toggleButton: false}));
                }}>
                <div className="btn btn-item" style={{marginTop: '10px'}}>
                        {this.props.lang === 'English' ? 'Yes' : 'Si'}
                </div>
                </button>

                <button onClick={() => {
                    this.setState(() => ({toggleButton: false}));
                }}>
                <div className="btn btn-item" style={{marginTop: '10px'}}>
                        {this.props.lang === 'English' ? 'No' : 'No'}
                </div>
                </button>
            </div>
            :
            <div>
            <button onClick={() => {this.setState(() => ({toggleButton: true}))}}>
                <div className="btn btn-item" style={{marginTop: '10px'}}>
                    {this.props.lang === 'English' ? 'Remove' : 'Remover'}
                </div>
            </button>
            </div>
        }
        </div>
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
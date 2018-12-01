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
        {this.props.lang === 'English' ? 
        <div>
            {this.props.classes.format == "classroom" && <p>Format: Classroom</p>}
            {this.props.classes.format == "blended" && <p>Format: Blended</p>}
            {this.props.classes.format == "online" && <p>Format: Online</p>}
        </div>
        :
        <div>
            {this.props.classes.format == "classroom" && <p>Formato: Salón de Clases</p>}
            {this.props.classes.format == "blended" && <p>Formato: Mixto</p>}
            {this.props.classes.format == "online" && <p>Formato: En Línea</p>}
        </div>
        }
    {
        //Class language
    }
        {this.props.lang === 'English' ?  
        <p>
            {this.props.classes.language == "spanish" ? 'Language: Spanish' : 'Language: English'}
        </p>
        :
        <p>
            {this.props.classes.language == "spanish" ? 'Lenguaje: Español' : 'Language: Inglés'}
        </p>
        }
    {
        //Class level
    }
        {this.props.lang === 'English' ? 
        <div>
            <p>Level: {this.props.classes.level}</p>
        </div>
        :
        <div>
            {this.props.classes.level == "Kindergarden - 3rd grade" && <p>Nivel: Kindergarden - 3er grado</p>}
            {this.props.classes.level == "4th - 6th grade" && <p>Nivel: 4to - 6to grado</p>}
            {this.props.classes.level == "7th - 8th grade" && <p>Nivel: 7mo - 8vo grado</p>}
            {this.props.classes.level == "9th - 12th grade" && <p>Nivel: 9no - 12mo grado</p>}
            {this.props.classes.level == "University / College" && <p>Nivel: Universidad/Colegio</p>}
        </div>
        
        }
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
        /*

    {this.props.classData.length > 1 && 
        <div>
        {this.state.toggleButton ? 
            
        <div>

            <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                {this.props.lang === 'English' ? 'Are you sure you would like to remove this class?' : '¿Estás seguro de que quieres remover esta clase?'}
            </div>
            <br/>
            <button onClick={() => {
                this.props.dispatch(removeClass(this.props.classes.classInfoId)); 
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
    */
}
        
    </div>
    );
    }
}

//Map list of classes and current language state to the component properties. 
const mapStateToProps = (state,props) => {
    return {
        classData: state.classes[0],
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
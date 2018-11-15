import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';
import { unloadClasses,loadClass } from '../../actions/classes';
import axios from 'axios';
import auth0Client from '../../Auth';

/**
 * Class List contains the list of classes which a user registered through his or her registration form. 
 */
class ClassList extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/teacher/settings/classes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            console.log("REPSONSE: ",response);
            response.data.classes.forEach(element => {
            this.props.dispatch(loadClass({userId: element.classinfoid, subject: element.subject, 
            format: element.format, language: element.language, level: element.level, 
            groupSize: element.groupsize, topicA: element.topica, topicB: element.topicb, topicC: element.topic}));
        });
        })
        .catch(error =>{
            console.log("ERROR CLASSES: ", error);
        })
    }
    componentWillUnmount(){
        this.props.dispatch(unloadClasses());
    }

    render(){
        return(
            <div>
            {
                //Page title
            }
                <h3>{this.props.lang === 'English' ? 'Classes' : 'Clases'}</h3>
            {
                //Display class list items
            }
                {this.props.classes.map((class_info) => {
                    return <ClassListItem key={class_info.classInfoId} class={class_info}/>
                })}
                <br/>
            </div>
        )
    }
}

//Map list of loaded classes and current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        classes: state.classes,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(ClassList);
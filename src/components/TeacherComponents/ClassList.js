import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';
import { loadClass } from '../../actions/classes';
import axios from 'axios';
import auth0Client from '../../Auth';

class ClassList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1}
    }
    componentWillMount(){
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

    render(){
        return(
            <div>
                <h3>{this.props.lang === 'English' ? 'Classes' : 'Clases'}</h3>
                {this.props.classes.map((class_info) => {
                    return <ClassListItem key={class_info.classInfoId} class={class_info}/>
                })}
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        classes: state.classes,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ClassList);
import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';
import { loadClass } from '../../actions/classes';
import axios from 'axios';

class ClassList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1}
    }
    componentWillMount(){
        axios.get('http://localhost:8081/teacher/classes')
        .then(response => {
            this.props.dispatch(loadClass({userId: response.data.userID, classInfoId: response.data.classInfoId, subject: response.data.subject, 
            format: response.data.format, language: response.data.language, level: response.data.level, 
            groupSize: response.data.groupSize, topicA: response.data.topicA, topicB: response.data.topicB}));
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
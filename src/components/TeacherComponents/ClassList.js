import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';
import { unloadClasses,loadClass } from '../../actions/classes';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setLoadingModal} from '../../actions/loadingModal';
import {setFailureModal} from '../../actions/failureModal';

/**
 * Class List contains the list of classes which a user registered through his or her registration form. 
 */
class ClassList extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/teacher/settings/classes',
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
        this.props.dispatch(setLoadingModal());
        })
        .catch(error =>{
            this.props.dispatch(setLoadingModal());
            this.props.dispatch(setFailureModal());
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
                <div className="form__title text-center">
                <p>{this.props.lang === 'English' ? 'Classes' : 'Cursos'}</p>
                <hr className="break" style={{borderColor: '#5933AA'}}/>
                </div>
            {
                //Display class list items
            }   
            <div className="list-group">
                    {this.props.classes.map((class_info) => {
                        return <ClassListItem key={class_info.classInfoId} classes={class_info}/>
                    })}
                    <br/>
                    </div>
            </div>
        )
    }
}

//Map list of loaded classes and current language state to the component properties. 
const mapStateToProps = (state) => {
    console.log(state.classes);
    return{
        classes: state.classes,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(ClassList);
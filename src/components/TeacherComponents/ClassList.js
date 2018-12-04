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
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Load class information from database.
        axios.get('https://beta.edvotech.com/api/teacher/settings/classes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            //Load class information to the controller
            response.data.classes.forEach(element => {
            this.props.dispatch(loadClass({userId: element.classinfoid, subject: element.subject, 
            format: element.format, language: element.language, level: element.level, 
            groupSize: element.groupsize, topicA: element.topica, topicB: element.topicb, topicC: element.topicc}));
        });
        //Clear loading modal
        this.props.dispatch(setLoadingModal());
        })
        .catch(error =>{
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
            //Set failure modal. 
            this.props.dispatch(setFailureModal());
        })
    }
    componentWillUnmount(){
        //Unload class from controller. 
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
    return{
        classes: state.classes,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(ClassList);
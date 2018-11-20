import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';

/**
 * Class List contains the list of classes which a user registered through his or her registration form. 
 */
class ClassList extends React.Component{
    constructor(props){
        super(props);
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
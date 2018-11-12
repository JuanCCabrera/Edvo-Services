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
import React from 'react';
import {connect} from 'react-redux';
import ClassListItem from './ClassListItem';

class ClassList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1}
    }

    render(){
        return(
            <div>
                <h3>Classes</h3>
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
        classes: state.classes
    }
}

export default connect(mapStateToProps)(ClassList);
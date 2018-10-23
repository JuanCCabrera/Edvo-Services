import React from 'react';
import {connect} from 'react-redux';
import SchoolListItem from './SchoolListItem';
import uuid from 'uuid';

class SchoolList extends React.Component{
    constructor(props){
        super(props);
        this.state = {pages: 1}
    }

    render(){
        return(
            <div>
                <h3>Institutions</h3>
                {this.props.schools.map((school) => {
                    return <SchoolListItem key={school.id} school={school}/>
                })}
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        schools: state.schools
    }
}

export default connect(mapStateToProps)(SchoolList);
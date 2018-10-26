import React from 'react';
import {connect} from 'react-redux';
import SchoolListItem from './SchoolListItem';
import uuid from 'uuid';
import axios from 'axios';
import {addSchool} from '../actions/school';

class SchoolList extends React.Component{
    constructor(props){
        super(props);
        this.state = {pages: 1}
    }

    componentWillMount(){
        //Change UUID for InsitutionID when DB connection is made
        axios.get('http://localhost:8081/schools')
        .then(response => {
            response.data.forEach(element => {
                this.props.dispatch(addSchool({id: uuid(), name: element.name , 
                    location: element.location, type: element.type, 
                    numAccounts: element.num}));
            });
                
            
        
        });
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
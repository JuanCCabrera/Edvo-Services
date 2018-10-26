import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

export default class CreateInstitutionForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            location: '', 
            type: 'public',
            institutionID: ''
        };
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({location}));
    }

    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/school/add', {
        name: this.state.name,
        location: this.state.location,
        type: this.state.type,
        institutionID: this.state.institutionID,
    }).then((response)=>{
        if(response.status == 200)
        this.props.history.push('/admin/settings/schools');
    });
    }

    render(){
        return(
            <div>
                <div>
                    <AdminButtonList/>
                </div>
                    
                <div>
                    <form onSubmit={this.onSubmit}>
                    <div>
                        <h2> Create New Institution </h2>
                        <label>Name:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>

                        <br/>
                        <label>Location:</label>
                        <input type="text" placeholder = "Location" value = {this.state.location} onChange={this.onLocationChange}/>
        
                        <br/>
                        <label>School Type:</label>
                        <br/>
                        <input type="radio" name="type" value= "public" checked={this.state.type === 'public'} onChange = {this.onTypeChange}/> Public {' '}
                        <input type="radio" name="type" value= "private" checked={this.state.type === 'private'} onChange = {this.onTypeChange}/> Private {' '}
                        <input type="radio" name="type" value= "independent" checked={this.state.type === 'independent'} onChange = {this.onTypeChange}/> Independent {' '}
                    
                        <br/>
                        <label>Institution ID:</label>
                        <input type="text" placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
                    
                        <br/>
                        <br/>
                        <Link to="/admin/settings/schools"><button>View Institution List</button></Link>
                        <button onClick={this.onSubmit}>Create</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}


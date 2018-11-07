import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateInstitutionForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            location: '', 
            type: 'public',
            institutionID: '',
            createInstitutionError: false
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
        if(!this.state.name || !this.state.location){
            this.setState(() => ({createInstitutionError : true})); 
        }else{
            this.setState(() => ({createInstitutionError: false}));
            this.props.history.push('/admin/settings/schools');
        }
        //TO-DO Add new school to database
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
                        <h2>{this.props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'}</h2>
                        <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>

                        <br/>
                        <label>{this.props.lang === 'English' ? 'Location' : 'Localización'}:</label>
                        <input type="text" placeholder = "Location" value = {this.state.location} onChange={this.onLocationChange}/>
        
                        <br/>
                        <label>{this.props.lang === 'English' ? 'School Type' : 'Tipo de Escuela'}:</label>
                        <br/>
                        <input type="radio" name="type" value= "public" checked={this.state.type === 'public'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Public' : 'Pública'} {' '}
                        <input type="radio" name="type" value= "private" checked={this.state.type === 'private'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Private' : 'Privada'} {' '}
                        <input type="radio" name="type" value= "independent" checked={this.state.type === 'independent'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Independent' : 'Independiente'} {' '}
                    
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'}:</label>
                        <input type="text" placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
                    
                        <br/>
                        <br/>

                        {this.state.createInstitutionError === true && 
                            <div className="text-danger">
                                {this.props.lang === 'English' ? <p>Please fill all the blank fields before submitting a new institution.</p> : <p>Por favor, llene todos los espacios restantes antes de guardar la institución nueva.</p>}
                            </div>
                        }
                        <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Create' : 'Crear'}</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(CreateInstitutionForm);


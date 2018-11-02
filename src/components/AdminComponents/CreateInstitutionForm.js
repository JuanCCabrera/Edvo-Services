import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class CreateInstitutionForm extends React.Component{
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
        console.log('submitted');

        //TO-DO Add new user to database
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


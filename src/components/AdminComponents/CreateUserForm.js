import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateUserForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '', 
            confirmPassword: '',
            name: '',
            lastName: '',
            dateOfBirth: moment(),
            calendarFocused: false,
            gender: 'male',
            levelOfEdu: 'AS',
            type: 'school',
            institutionID: ''
        };
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({confirmPassword}));
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}));
    }

    onGenderChange = (e) => {
        const gender = e.target.value;
        this.setState(() => ({gender}));
    }

    onDateChange = (dateOfBirth) => {
        if(dateOfBirth){
            this.setState(() => ({dateOfBirth}));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onLOEChange = (e) => {
        const levelOfEdu = e.target.value;
        this.setState(() => ({levelOfEdu}));
    }

    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/user/add', {
            email: this.state.email,
            password: this.state.password, 
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            calendarFocused: this.state.calendarFocused,
            gender: this.state.gender,
            levelOfEdu: this.state.levelOfEdu,
            type: this.state.type,
            institutionID: this.state.institutionID
    }).then((response)=>{
        if(response.status == 200)
            this.props.history.push('/admin/settings/users');
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
                        <h2> {this.props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'} </h2>
                        <br/>

                        <label>Email:</label>
                        <input type="text" placeholder = "Email" value = {this.state.email} onChange={this.onEmailChange}/>
        
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Password' : 'Contraseña'}:</label>
                        <input type="password" placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
        
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'}:</label>
                        <input type="password" placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>

                        <br/>
                        <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                    
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange}/>

                        <br/>
                        <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
                        <br/>
                        <SingleDatePicker
                        date={this.state.dateOfBirth}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={day => (moment().diff(day) < 0)}
                        />
                        
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                        <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                        {
                            //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> Other <br/>
                        }
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                        <br/>
                        <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Associate\'s Degree' : 'Grado Asociado'}<br/>
                        <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Bachellor\'s Degree' : 'Bachillerato'}<br/>
                        <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Master\'s Degree' : 'Maestría'}<br/>
                        <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/>{this.props.lang === 'English' ? 'Doctor of Philosophy' : 'Doctor en Filosofía'}<br/>
                        <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Doctor of Education' : 'Doctor en Educación'}<br/>
                        <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'None' : 'Ninguna'}<br/>
                     
                        <br/>
                        <label>{this.props.lang === 'English' ? 'User Type' : 'Tipo de Usuario'}:</label>
                        <br/>
                        <input type="radio" name="type" value= "school" checked={this.state.type === 'school'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'School' : 'Escuela'}<br/>
                        <input type="radio" name="type" value= "mentor" checked={this.state.type === 'mentor'} onChange = {this.onTypeChange}/> Mentor<br/>
                        <input type="radio" name="type" value= "admin" checked={this.state.type === 'admin'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Admin' : 'Administrador'}<br/>
                        
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
export default connect(mapStateToProps)(CreateUserForm);


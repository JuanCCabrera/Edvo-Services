import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import { connect } from 'react-redux';

/**
 * Form to create a new user and upload his or her information to the database
 */
class CreateUserForm extends React.Component{
    constructor(props){
        super(props);
        //A new user must have an email, password, name, last name, date of birth, gender, 
        //specified level of education, user type (School, Administrator, or Mentor), and optional 
        //institution ID (if the user is of the school type). 
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

    //Change email in local state
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    //Change password in local state
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    //Change confirmPassword in local state
    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({confirmPassword}));
    }

    //Change name in local state
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    //Change lastName in local state
    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}));
    }

    //Change gender in local state
    onGenderChange = (e) => {
        const gender = e.target.value;
        this.setState(() => ({gender}));
    }

    //Change dateOfBirth in local state
    onDateChange = (dateOfBirth) => {
        if(dateOfBirth){
            this.setState(() => ({dateOfBirth}));
        }
    };

    //Change calendarFocused in local state
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    //Change levelOfEdu in local state
    onLOEChange = (e) => {
        const levelOfEdu = e.target.value;
        this.setState(() => ({levelOfEdu}));
    }

    //Change type in local state
    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    //Change institutionID in local state
    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    //Submit new user information
    onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');

        //TO-DO Add new user to database
    }

    render(){
        return(
            <div>
                <div>
                    {
                        //List of links to traverse the Administrator Settings page.
                    }
                    <AdminButtonList/>
                </div>
                    
                <div>
                    <form onSubmit={this.onSubmit}>
                    <div>
                        {
                            //Page title
                        }
                        <h2> {this.props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'} </h2>
                        <br/>

                        {
                            //Email input field
                        }
                        <label>Email:</label>
                        <input type="text" placeholder = "Email" value = {this.state.email} onChange={this.onEmailChange}/>
        
                        <br/>
                        {
                            //Password input field
                        }
                        <label>{this.props.lang === 'English' ? 'Password' : 'Contraseña'}:</label>
                        <input type="password" placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
        
                        <br/>
                        {
                            //Confirm Password input field
                        }
                        <label>{this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'}:</label>
                        <input type="password" placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>

                        <br/>
                        {
                            //Name input field
                        }
                        <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                    
                        <br/>
                        {
                            //Last name input field
                        }
                        <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange}/>

                        <br/>
                        {
                            //Date of birth selector
                        }
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
                        {
                            //Gender radio button selector
                        }
                        <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                        <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                        {
                            //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> Other <br/>
                        }
                        <br/>
                        {
                            //Level of education radio button selector
                        }
                        <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                        <br/>
                        <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Associate\'s Degree' : 'Grado Asociado'}<br/>
                        <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Bachellor\'s Degree' : 'Bachillerato'}<br/>
                        <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Master\'s Degree' : 'Maestría'}<br/>
                        <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/>{this.props.lang === 'English' ? 'Doctor of Philosophy' : 'Doctor en Filosofía'}<br/>
                        <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Doctor of Education' : 'Doctor en Educación'}<br/>
                        <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'None' : 'Ninguna'}<br/>
                     
                        <br/>
                        {
                            //User type radio button selector
                        }
                        <label>{this.props.lang === 'English' ? 'User Type' : 'Tipo de Usuario'}:</label>
                        <br/>
                        <input type="radio" name="type" value= "school" checked={this.state.type === 'school'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'School' : 'Escuela'}<br/>
                        <input type="radio" name="type" value= "mentor" checked={this.state.type === 'mentor'} onChange = {this.onTypeChange}/> Mentor<br/>
                        <input type="radio" name="type" value= "admin" checked={this.state.type === 'admin'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Admin' : 'Administrador'}<br/>
                        
                        <br/>
                        {
                            //Institution ID input field
                        }
                        <label>{this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'}:</label>
                        <input type="text" disabled={this.state.type !== 'school'} placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
                        <br/>
                        <br/>
                        {
                            //Submit user information button
                        }
                        <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Create' : 'Crear'}</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}

//Map current language state to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to controller
export default connect(mapStateToProps)(CreateUserForm);


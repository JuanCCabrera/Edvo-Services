import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
            institutionID: '',
            creationError: false
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
        console.log(this.state);

        if(!this.state.email || !this.state.password || !this.state.confirmPassword || !this.state.name || !this.state.lastName || (this.state.type === 'school' && !this.state.institutionID)){
            this.setState(() => ({creationError: true}));
        }else{
            this.setState(() => ({creationError: false}));
            this.props.history.push('/admin/settings/users');
        }
        //TO-DO Add new user to database
    }

    render(){
        return(
            <div className="background-home">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-2 text-center well">
                                {
                                    //List of links to traverse the Administrator Settings page.
                                }
                                <AdminButtonList/>
                        </div>

                        <div className="col-sm-1"/>

                        <div className="big-card col-sm-9">
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    {
                                        //Page title
                                    }
                                    <div className="form__title">
                                        <p> 
                                            {this.props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'} 
                                        </p>
                                        
                                        <hr className="break" style={{borderColor: '#5933AA'}}/>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {
                                                //Name input field
                                            }
                                            <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                                            <br/>
                                            <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                                        
                                            <br/>
                                        </div>
                                        <div className="col-sm-6">
                                            {
                                                //Last name input field
                                            }
                                            <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                                            <br/>
                                            <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange}/>

                                            <br/>
                                        </div>
                                    </div>

                                    {
                                        //Email input field
                                    }
                                    <label>Email:</label>
                                    <br/>
                                    <input type="text" className="form-control" style={{width: '40%'}} placeholder = "Email" value = {this.state.email} onChange={this.onEmailChange}/>
                    
                                    <br/>

                                    {
                                        //Password input field
                                    }
                                    <label>{this.props.lang === 'English' ? 'Password' : 'Contraseña'}:</label>
                                    <br/>
                                    <input type="password" className="form-control" style={{width: '50%'}} placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
                    
                                    <br/>
                                
                                    {
                                        //Confirm Password input field
                                    }
                                    <label>{this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'}:</label>
                                    <br/>
                                    <input type="password" className="form-control" style={{width: '50%'}} placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>

                                    <br/>
                                   
                                    {
                                        //Date of birth selector
                                    }
                                    <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
                                    <br/>

                                    {/*
                                    <SingleDatePicker
                                    date={this.state.dateOfBirth}
                                    onDateChange={this.onDateChange}
                                    focused={this.state.calendarFocused}
                                    onFocusChange={this.onFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={day => (moment().diff(day) < 0)}
                                    />
                                    */}
                                    <span style={{color: 'gray', fontSize: '1.2rem'}}>(MM/DD/{this.props.lang === 'English' ? 'YYYY' : 'AAAA'})</span>
                                    <br/>
                                    <DatePicker
                                    selected={this.state.dateOfBirth}
                                    onChange={this.onDateChange}
                                    className="form-control"
                                    />

                                    <br/>
                                    <br/>
                                    {
                                        //Gender radio button selector
                                    }
                                    <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                                    <br/>
                                    <label className="clickable radio__text">
                                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? ' Male' : ' Masculino'}
                                    </label>
                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? ' Female' : ' Femenino'}
                                    </label>
                                    <br/>
                                    {
                                        //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> Other <br/>
                                    }
                                    <br/>
                                    {
                                        //Level of education radio button selector
                                    }
                                    <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                                    <br/>
                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? ' Associate\'s Degree' : ' Grado Asociado'}
                                    </label>

                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? ' Bachellor\'s Degree' : ' Bachillerato'}
                                    </label>

                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? ' Master\'s Degree' : ' Maestría'}
                                    </label>

                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/>{this.props.lang === 'English' ? ' Doctor of Philosophy' : ' Doctor en Filosofía'}
                                    </label>

                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? ' Doctor of Education' : ' Doctor en Educación'}
                                    </label>

                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? ' None' : ' Ninguna'}
                                    </label>

                                    <br/>
                                    <br/>
                                    {
                                        //User type radio button selector
                                    }
                                    <label>{this.props.lang === 'English' ? 'User Type' : 'Tipo de Usuario'}:</label>
                                    <br/>
                                    <label className="clickable radio__text">
                                        <input type="radio" name="type" value= "school" checked={this.state.type === 'school'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'School' : 'Escuela'}<br/>
                                    </label>
                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="type" value= "mentor" checked={this.state.type === 'mentor'} onChange = {this.onTypeChange}/> Mentor<br/>
                                    </label>
                                    <br/>

                                    <label className="clickable radio__text">
                                        <input type="radio" name="type" value= "admin" checked={this.state.type === 'admin'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Admin' : 'Administrador'}<br/>
                                    </label>
                                    <br/>

                                    <br/>
                                    {
                                        //Institution ID input field
                                    }
                                    <label>{this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'}:</label>
                                    <br/>
                                    <input type="text" className="form-control" style={{width: '40%'}} maxLength="8" disabled={this.state.type !== 'school'} placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                                    {
                                        //Message displayed when trying to submit a new user without filling all the fields. 
                                    }
                                    {this.state.creationError}
                                    <br/>
                                    {this.state.creationError === true && 
                                        <div className="text-danger" style={{marginBottom: "2.7rem"}}>
                                            {this.props.lang === 'English' ? <p>Please fill all blank fields.</p> : <p>Por favor, llene todos los campos.</p>}
                                        </div>
                                    }

                                    {
                                        //Submit user information button
                                    }
                                    <button onClick={this.onSubmit}>
                                        <div className="btn btn-item">
                                            {this.props.lang === 'English' ? 'Create' : 'Crear'}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
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


import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminButtonList from './AdminButtonList';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { setSuccessModal } from '../../actions/successModal';
import { setFailureModal } from '../../actions/failureModal';

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
            emailError: '',

            password: '', 
            passwordError: '',

            confirmPassword: '',
            confrimPasswordError: '',

            name: '',
            nameError:'',

            lastName: '',
            lastNameError: '',

            dateOfBirth: moment().subtract('18',"years"),
            dateOfBirthError: '',

            calendarFocused: false,
            gender: 'male',
            levelOfEdu: 'AS',
            type: 'school',
            institutionID: '',
            institutionIDError: '',
            requestError: '',

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
        var today=moment();
        var difference = today.diff(dateOfBirth, 'years');
        //Check if the selected date of birth falls between 18-90 years ago. 
        if(dateOfBirth && (difference >= 18 && difference < 90)){
            this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: ''}));
        }else{
            if(this.props.lang === 'English'){
                this.setState(() => ({dateOfBirthError: 'Enter a valid date of birth.'}));
            }else{
                this.setState(() => ({dateOfBirthError: 'Escriba una fecha de nacimiento valida.'}));
            }
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
        this.setState(() => ({type, institutionID: '', institutionIDError: ''}));
    }

    //Change institutionID in local state
    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Update the language of the error messages whenever the language is set to change. 
            if(this.props.lang === 'English'){
                if(this.state.emailError){
                    this.setState(() => ({emailError: 'Enter a valid email address.'}));
                }
                if(this.state.passwordError){
                    this.setState(() => ({passwordError: 'Enter a valid password.'}));
                }
                if(this.state.confirmPasswordError){
                    this.setState(() => ({confirmPasswordError: 'Incorrect password. Try again. '}));
                }
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'The name field must contain text.'}));
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'The last name field must contain text.'}));
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Enter a valid date of birth'}));
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                }                
                if(this.state.requestError){
                    this.setState(() => ({requestError: 'The user already exists'}));
                }
            }else{
                if(this.state.emailError){
                    this.setState(() => ({emailError: 'Escriba una dirección electrónica valida.'}))
                }
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'}))
                }
                if(this.state.passwordError){
                    this.setState(() => ({passwordError: 'Escriba una contraseña valida.'}));
                }
                if(this.state.confirmPasswordError){
                    this.setState(() => ({confirmPasswordError: 'Contraseña incorrecta. Trate otra vez.'}));
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Escriba una fecha de nacimiento valida.'}));
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Escriba una identificación de institución valida.'}));
                }
                if(this.state.requestError){
                    this.setState(() => ({requestError: 'El usuario ya existe'}));
                }
            }
        }
    }

    //Submit new user information
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.email || !this.state.password || !this.state.confirmPassword || !this.state.name || !this.state.lastName || (this.state.type === 'school' && !this.state.institutionID)){
            this.setState(() => ({creationError: true}));
        }else if(this.state.emailError || this.state.nameError || this.state.lastNameError || this.state.passwordError || this.state.confirmPasswordError || this.state.dateOfBirthError || this.state.institutionIDError){
            this.setState(() => ({creationError: true}));
        }else{
            this.setState(() => ({creationError: false}));
            axios.post('https://beta.edvotech.com/api/admin/settings/users/add', {
            email: this.state.email,
            password: this.state.password, 
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
            lastname: this.state.lastName,
            dob: this.state.dateOfBirth,
            calendarFocused: this.state.calendarFocused,
            gender: this.state.gender,
            levelOfEdu: this.state.levelOfEdu,
            usertype: this.state.type,
            institutionid: this.state.institutionID,
            policies: true
    },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then((response)=>{
        if(response.status == 201)
            this.props.dispatch(setSuccessModal());
            this.props.history.push('/admin/settings/users');
    })
    .catch(error => {
        if(error.response.status == 401 || error.response.status == 403)     
            this.setState({requestError: error.response.data.message});
    });
        }
        
    }

    render(){
        return(
            <div className="background-home">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-2">
                            <div className="text-center well">
                                {
                                    //List of links to traverse the Administrator Settings page.
                                }
                                <AdminButtonList/>
                            </div>
                        </div>

                        <div className="col-sm-1"/>

                        <div className="col-sm-9">
                        <div className="big-card ">
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
                                            <input type="text" className="form-control" maxLength="100" placeholder={this.props.lang === 'English' ? 'Name' : 'Nombre'} onBlur={() => {
                                                //Check if the name field only contains spaces. 
                                                this.setState(() => ({name: this.state.name.trim()}));
                                                if(this.state.name.match(/^\s+$/)){
                                                    if(this.props.lang === 'English'){
                                                        this.setState(() => ({nameError: 'The name field must contain text.'}));
                                                    }else{
                                                        this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'})); 
                                                    }
                                                }else{
                                                    this.setState(() => ({nameError: ''}));
                                                }
                                            }}
                                            value={this.state.name} onChange={this.onNameChange}/>
                                            {
                                                //Name error
                                            }
                                            {this.state.nameError && 
                                                <div>
                                                    <span className="text-danger"> 
                                                        {this.state.nameError}
                                                    </span>
                                                    <br/>
                                                </div>}
                                            <br/>

                                        </div>
                                        <div className="col-sm-6">
                                            {
                                                //Last name input field
                                            }
                                            <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                                            <br/>
                                            <input type="text" className="form-control" maxLength="100" placeholder={this.props.lang === 'English' ? 'Last Name' : 'Apellido'} onBlur={() => {
                                                //Check if the last name field only consists of spaces. 
                                                this.setState(() => ({lastName: this.state.lastName.trim()}));
                                                if(this.state.lastName.match(/^\s+$/)){
                                                    if(this.props.lang === 'English'){
                                                        this.setState(() => ({lastNameError: 'The last name field must contain text.'}));
                                                    }else{
                                                        this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'})); 
                                                    }
                                                }else{
                                                    this.setState(() => ({lastNameError: ''}));
                                                }
                                            }}
                                            value={this.state.lastName} onChange={this.onLastNameChange}/>

                                            {
                                                //Last name error
                                            }
                                            {this.state.lastNameError && 
                                                <div>
                                                    <span className="text-danger"> 
                                                        {this.state.lastNameError}
                                                    </span>
                                                    <br/>
                                                </div>}
                                            <br/>
                                        </div>
                                    </div>

                                    {
                                        //Email input field
                                    }
                                    <label>Email:</label>
                                    <br/>
                                    <input type="text" className="form-control" maxLength="100" style={{width: '70%'}} placeholder = "Email" onBlur={() => {
                                        //Check if the email field matches the expected email address format.
                                        this.setState(() => ({email: this.state.email.trim()})); 
                                        if(this.state.email && !this.state.email.toLowerCase().match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b$/)){
                                            if(this.props.lang === 'English'){
                                                this.setState(() => ({emailError: 'Enter a valid email address.'}));
                                            }else{
                                                this.setState(() => ({emailError: 'Escriba una dirección electrónica valida.'})); 
                                            }
                                        }else{
                                            this.setState(() => ({emailError: ''}));
                                        }
                                    }}
                                    value = {this.state.email}
                                    onChange = {this.onEmailChange}
                                    />
                
                                    {
                                        //Email error
                                    }
                                    {this.state.emailError && 
                                        <div>
                                            <span className="text-danger"> 
                                                {this.state.emailError}
                                            </span>
                                            <br/>
                                        </div>}
                                    <br/>
                
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {
                                                //Password input field
                                            }
                                            <label>{this.props.lang === 'English' ? 'Password' : 'Contraseña'}:</label>
                                            <br/>
                                            <input type="password" className="form-control" maxLength="100" style={{width: '90%'}} placeholder = {this.props.lang === 'English' ? 'Password' : 'Contraseña'} value = {this.state.password} onChange={this.onPasswordChange} onBlur={() => {
                                                //Check if the password field matches the expected password format. 
                                                if(this.state.password && !this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)){
                                                    if(this.props.lang === 'English'){
                                                        this.setState(() => ({passwordError: 'Enter a valid password.'}));
                                                    }else{
                                                        this.setState(() => ({passwordError: 'Escriba una contraseña valida.'})); 
                                                    }
                                                }else{
                                                    this.setState(() => ({passwordError: ''}));
                                                }
                                            }}/>
                        
                                            {
                                                //Password error
                                            }
                                            {this.state.passwordError && 
                                                <div>
                                                    <span className="text-danger"> 
                                                        {this.state.passwordError}
                                                    </span>
                                                    <br/>
                                                </div>}
                                            <br/>
                                            
                                        
                                            {
                                                //Confirm Password input field
                                            }
                                            <label>{this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'}:</label>
                                            <br/>
                                            <input type="password" className="form-control" maxLength="100" style={{width: '90%'}} placeholder = {this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'} value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange} onBlur={() => {
                                                //Check if the confirm password field matches the password field. 
                                                if((this.state.password !== this.state.confirmPassword) && this.state.confirmPassword){
                                                    if(this.props.lang === 'English'){
                                                        this.setState(() => ({confirmPasswordError: 'Incorrect password. Try again.'}));
                                                    }else{
                                                        this.setState(() => ({confirmPasswordError: 'Contraseña incorrecta. Trate otra vez.'})); 
                                                    }
                                                }else{
                                                    this.setState(() => ({confirmPasswordError: ''}));
                                                }
                                            }}/>
                        
                                            {
                                                //Confirm password error
                                            }
                                            {this.state.confirmPasswordError && 
                                                <div>
                                                    <span className="text-danger"> 
                                                        {this.state.confirmPasswordError}
                                                    </span>
                                                    <br/>
                                                </div>}
                                            <br/>
                                        
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="item-card">
                                                <ul style={{fontSize: '1.3rem', paddingLeft: '0'}}>
                                                <p className="card-title">{this.props.lang === 'English' ? 'Password Requirements' : 'Requisitos de Contraseña'}:</p>
                                                <li>{this.props.lang === 'English' ? 'Minimum of 8 characters' : 'Mínimo de 8 caracteres'}</li>
                                                <li>{this.props.lang === 'English' ? 'At least one character of each of the following' : 'Al menos un caracter de cada uno de los siguientes'}:</li>
                                                <ul style={{paddingLeft: '0.5rem'}}>
                                                    <li>- {this.props.lang === 'English' ? 'Lowercase letters' : 'Letras minúsculas'} (a-z)</li>
                                                    <li>- {this.props.lang === 'English' ? 'Uppercase letters' : 'Letras mayúsculas'} (A-Z)</li>
                                                    <li>- {this.props.lang === 'English' ? 'Numbers' : 'Números'} (0-9)</li>
                                                    <li>- {this.props.lang === 'English' ? 'Special characters' : 'Caracteres especiales'} (e.g. !@#$%^&*)</li>
                                                    </ul>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
                                    className="form-control" 
                                    selected={this.state.dateOfBirth}
                                    onChange={this.onDateChange}
                                    maxDate={moment()}
                                    />
                                    <br/>

                                    {this.state.dateOfBirthError && 
                                        <div>
                                            <span className="text-danger"> 
                                                {this.state.dateOfBirthError}
                                            </span>
                                            <br/>
                                        </div>}
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
                                    <input type="text" className="form-control" maxLength="30" style={{width: '40%'}} disabled={this.state.type !== 'school'} placeholder ={this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'} onBlur={() => {
                                        //Check if institution ID field matches expected format. 
                                        this.setState(() => ({institutionID: this.state.institutionID.trim()}));
                                        if(!this.state.institutionID.match(/^[a-zA-Z0-9\|]*$/)){
                                            if(this.props.lang === 'English'){
                                                this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                                            }else{
                                                this.setState(() => ({institutionIDError: 'Escriba una identificación de institución valida.'})); 
                                            }
                                        }else{
                                            this.setState(() => ({institutionIDError: ''}));
                                        }
                                    }}
                                    value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
    
                                    {
                                        //Institution ID error
                                    }
                                    {this.state.institutionIDError && 
                                        <div>
                                            <span className="text-danger"> 
                                                {this.state.institutionIDError}
                                            </span>
                                            <br/>
                                        </div>}

                                    {
                                        //Message displayed when trying to submit a new user without filling all the fields. 
                                    }
                                    {this.state.creationError}
                                    <br/>
                                    {this.state.creationError === true && 
                                        <div className="text-danger" style={{marginBottom: "2.7rem"}}>
                                            {this.props.lang === 'English' ? <p>Please fill all the fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                                        </div>
                                    }

                                    {
                                        //Message displayed when backend throws an error
                                    }
                                    <br/>
                                    {this.state.requestError && 
                                        <div>
                                             <span className="text-danger"> 
                                                {this.state.requestError}
                                            </span>
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


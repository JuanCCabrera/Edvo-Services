import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import axios from 'axios';
import auth0Client from '../Auth';
import {loadProfile} from '../actions/profile';

const reset = () => {
    console.log("RESETTING");
    axios.post('https://edvo-test.auth0.com/dbconnections/change_password', {
      client_id: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      email: auth0Client.getEmail(),
      connection: 'Username-Password-Authentication' ,
      json: true
    },
    {headers: { 'content-type': 'application/json' }});
  };

/**
 * Basic information profile form available in the settings page of every user type. It allows users to change their name, last name, gender, and date of birth as well as access means to change their password. 
 */
class BasicInfoProfileForm extends React.Component{
    constructor(props){
        super(props);
        //The name, last name, date of birth and gender fields must be filled to submit the form. 
        this.state={
            props: props,
            name: props.info ? props.info.name : '',
            nameError: '',

            lastName: props.info ? props.info.lastName : '',
            lastNameError: '',

            dateOfBirth: props.info ? props.info.dateOfBirth : moment(),
            dateOfBirthError: '',

            calendarFocused: false,
            gender: props.info ? props.info.gender : 'male',
            formIncompleteError: false
        };
    }

    componentWillMount(){
        console.log("WE HAVE EMAIL: ",auth0Client.getIdToken());
        //send this to action
        axios.get('http://localhost:3000/admin/settings/info',
        {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
        .catch(error=>{
            console.log("ERROR: ", error);
        })
        .then(response => {
            
            this.setState({name: response.data.info.name, lastName: response.data.info.lastname,
                 dateOfBirth: moment(response.data.info.dob), gender: response.data.info.gender});
        });
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

    //Change date of birth in local state
    onDateChange = (dateOfBirth) => {
        var today=moment();
        var difference = today.diff(dateOfBirth, 'years');
        //Check if the selected date of birth falls between 18-90 years ago. 
        if(dateOfBirth && (difference > 18 && difference < 90)){
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

    //Lead to change password page (Requires integration)
    changePassword = (e) => {
        e.preventDefault();
        reset();

        //TO-DO Modify password and update in database
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Change rendered error message if the language changes. 
            if(this.props.lang === 'English'){
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'The name field must contain text.'}));
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'The last name field must contain text.'}));
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Enter a valid date of birth.'}));
                }
            }else{
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'}))
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Escriba una fecha de nacimiento valida.'}));
                }
            }
        }
    }

    //Submit new user information
    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.name === '' || this.state.lastName === ''){
            this.setState(() => ({formIncompleteError: true}));
        }else if(this.state.nameError || this.state.lastNameError || this.state.dateOfBirthError){
            this.setState(() => ({formIncompleteError: true}));
        }else{
            this.setState(() => ({formIncompleteError: false}));
            axios.post('http://localhost:3000/admin/settings/info', {
            name: this.state.name,
            lastname: this.state.lastName,
            dob: this.state.dateOfBirth,
            gender: this.state.gender
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
            .then((response)=>{
                if(response.status == 201)
                    this.state.props.history.push('/admin/home');
            });
            console.log('submitted');
            console.log(this.state);
        }

        //TO-DO Modify user data in database
        //TO-DO Display existing user data in text fields by default
    }

    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <div className="form__title">
                            <p> 
                                {this.props.lang === 'English' ? 'My Profile' : 'Mi Perfil'} 
                            </p>
                            
                            <hr className="break" style={{borderColor: '#5933AA'}}/>
                        </div>
                            <div className="row">
                                <div className="col-sm-6">
                                {
                                    //Name input field
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                                <input type="text" placeholder="Name" className="form-control" maxLength="100" onBlur={() => {
                                    //Check if the name field only consists of spaces. 
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
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                                <input type="text" placeholder="Last Name" className="form-control" maxLength="100" onBlur={() => {
                                    //Check if the last name field only consists of spaces. 
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
                            //Date of birth input field
                        }
                        <span className="req">*</span>
                        <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
                        <br/>
                        {
                            //Date of birth selector
                        }

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

                        {this.state.dateOfBirthError && 
                            <div>
                                <span className="text-danger"> 
                                    {this.state.dateOfBirthError}
                                </span>
                                <br/>
                            </div>}
                        <br/>

                        {
                            //Gender radio selector
                        }
                        <span className="req">*</span>
                        <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                        <br/>

                        <label className="clickable radio__text">
                            <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> 
                            {this.props.lang === 'English' ? ' Male' : ' Masculino'}
                        </label>

                        <br/>
                        <label className="clickable radio__text">
                            <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                        </label>
                        {

                            //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Gender' : 'Género'} <br/>
                        }

                        {
                            //Error message displayed if there is a missing field
                        }
                        {this.state.formIncompleteError === true && 
                        <div className="text-danger" style={{marginTop: '2rem', marginBottom: '0'}}>
                            {this.props.lang === 'English' ? <p>Please fill all the fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                        </div>}

                        <br/>

                        {
                            //Submit button
                        }
                        <button onClick={this.onSubmit}>
                            <div className="btn btn-item" style={{marginTop: '2rem'}}>
                                {this.props.lang === 'English' ? 'Save' : 'Guardar'}
                            </div>
                        </button>

                        {
                            //Change password button
                        }
                        
                        <button onClick={this.changePassword}>
                            <div className="btn btn-item" style={{marginTop: '2rem'}}>
                                {this.props.lang === 'English' ? 'Change Password' : 'Modificar Contraseña'} 
                            </div>
                        </button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}

//Map current language state to components properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
        info: state.profile
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(BasicInfoProfileForm);
import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import axios from 'axios';
import auth0Client from '../Auth';
import {loadProfile} from '../actions/profile';
import {setEditModal} from '../actions/editModal';
import { setFailureModal } from '../actions/failureModal';
import { setLoadingModal } from '../actions/loadingModal';



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

            dateOfBirth: props.info ? props.info.dateOfBirth : moment().subtract('18',"years"),
            dateOfBirthError: '',
            

            calendarFocused: false,
            gender: props.info ? props.info.gender : 'male',
            formIncompleteError: false,
            profileInvalidInputs: false,
            resetPasswordMessage: false
        };
    }
    //Request a password change
    resetPassword(){
        let message = false;
        //Request password change to the database and auth0 client. 
        axios.post('https://edvo-test.auth0.com/dbconnections/change_password', {
          client_id: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
          email: auth0Client.getEmail(),
          connection: 'Username-Password-Authentication' ,
          json: true
        },
        {headers: { 'content-type': 'application/json' }})
        .then(response => {
            //Display success and instructions message if request is successful. 
            if(response.status == 200){
                message = true;
            }
        });
      };
      
    
    componentWillMount(){
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Load user information to display in profile form
        axios.get('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/settings/info',
        {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
        .then(response => {
            //Load user information to the controller
            const dateCheck = moment(response.data.info.dob).add('4',"hours");
            this.setState({name: response.data.info.name, lastName: response.data.info.lastname,
                 dateOfBirth: moment(response.data.info.dob).add('4',"hours"), gender: response.data.info.gender});
            
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
        }).catch(error=>{
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
            //Set failure modal
            this.props.dispatch(setFailureModal());
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
        if(dateOfBirth && (difference >= 18 && difference < 90)){
            this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: ''}));
        }else{
            if(this.props.lang === 'English'){
                this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: 'You must be 18 or older.'}));
            }else{
                this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: 'Usted debe tener 18 años o más.'}));
            }
        }
    };

    //Change calendarFocused in local state
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

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
                    this.setState(() => ({dateOfBirthError: 'You must be 18 or older.'}));
                }
            }else{
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'}))
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Usted debe tener 18 años o más.'}));
                }
            }
        }
    }

    //Activate password reset process. 
    onResetClick = (e) => {
        e.preventDefault();
        this.setState({resetPasswordMessage: true});
        this.resetPassword();
    }

    //Submit new user information
    onSubmit = (e) => {
        e.preventDefault();
        //Generate error if name or last name fields are empty
        if(this.state.name === '' || this.state.lastName === ''){
            this.setState(() => ({formIncompleteError: true}));
        //Generate error if required fields are left blank
        }else if(this.state.nameError || this.state.lastNameError || this.state.dateOfBirthError){
            this.setState(() => ({formIncompleteError: true}));
        //Validation successful
        }else{
            //Clear error message
            this.setState(() => ({formIncompleteError: false}));
            //Post new user information to the database. 
            axios.post('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/settings/info', {
            name: this.state.name,
            lastname: this.state.lastName,
            dob: moment(this.state.dateOfBirth).format("YYYY-MM-DD"),
            gender: this.state.gender
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
                .catch(error => {
                    //Set failure modal
                    if(error.response.status == 401){
                        this.props.dispatch(setFailureModal());
                        this.setState(() => ({profileInvalidInputs: false}));
                    }
    
                    //Warn user of invalid inputs used
                    else if(error.response.status == 403 || error.response.status == 500){
                        this.setState(() => ({profileInvalidInputs: true}));
                    }
                })
            .then((response)=>{
                //Load user information to controller and set successful edit modal. 
                if(response.status == 201){
                    this.props.dispatch(loadProfile({name: this.state.name, lastName: this.state.lastName, dateOfBirth: this.state.dateOfBirth, gender: this.state.gender}));
                    this.props.dispatch(setEditModal());

                }
            });
        }

    }

    render(){
        return(
            <div>
                <div>
                    <form>
                        <div>
                            <div className="form__title">
                            {
                                //Page title
                            }
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
                                <input type="text" placeholder={this.props.lang === 'English' ? 'Name' : 'Nombre'} className="form-control" maxLength="100" onBlur={() => {
                                    //Check if the name field only consists of spaces. 
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
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                                <input type="text" placeholder={this.props.lang === 'English' ? 'Last Name' : 'Apellido'} className="form-control" maxLength="100" onBlur={() => {
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
                            //Date of birth input field
                        }
                        <span className="req">*</span>
                        <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
                        <br/>
                        {
                            //Date of birth selector
                        }
                        
                    <span style={{color: 'gray', fontSize: '1.2rem'}}>(MM/DD/{this.props.lang === 'English' ? 'YYYY' : 'AAAA'})</span>
                    <br/>
                        <DatePicker
                        className="form-control" 
                        selected={this.state.dateOfBirth}
                        onChange={this.onDateChange}
                        maxDate={moment()}
                        />
                        {
                            //Date of birth error
                        }
                        {this.state.dateOfBirthError && 
                            <div>
                                <span className="text-danger"> 
                                    {this.state.dateOfBirthError}
                                </span>
                                <br/>
                            </div>}
                        <br/>
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
                        {this.state.profileInvalidInputs === true && 
                            <div className="text-danger text-center">
                                {this.props.lang === 'English' ? <p>Invalid user or data.</p> : <p>Usuario o datos no validos.</p>}
                            </div>
                        }

                        <br/>
                        <br/>

                        {
                            //Submit button
                        }
                        <button className="btn btn-item" onClick={this.onSubmit}>
                            <div>
                                {this.props.lang === 'English' ? 'Save' : 'Guardar'}
                            </div>
                        </button>

                        {
                            //Change password button
                        }
                        <span> </span>
                        <button className="btn btn-item" onClick={this.onResetClick}>
                            <div>
                                {this.props.lang === 'English' ? 'Change Password' : 'Modificar Contraseña'} 
                            </div>
                        </button>
                        <br/>
                        <br/>
                        {
                            //Instructions and disclaimer messages for changing passwords. 
                        }
                        {this.state.resetPasswordMessage == true && (this.props.lang === 'English' ? 'An email has been sent to '+auth0Client.getEmail()+' with instructions to change your password.' 
                        : 'Un correo electrónico ha sido enviado a '+auth0Client.getEmail()+' con un enlace para cambiar su contraseña.')}
                        
                        {this.state.resetPasswordMessage == true && (this.props.lang === 'English' ? '*If you are using a Microsoft account this will not reset your password.' 
                        : '*Si está utilizando una cuenta Microsoft, usted no podrá cambiar su contraseña por este medio.')}
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
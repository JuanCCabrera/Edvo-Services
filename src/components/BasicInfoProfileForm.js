import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';

/**
 * Basic information profile form available in the settings page of every user type. It allows users to change their name, last name, gender, and date of birth as well as access means to change their password. 
 */
class BasicInfoProfileForm extends React.Component{
    constructor(props){
        super(props);
        //The name, last name, date of birth and gender fields must be filled to submit the form. 
        this.state={
            name: props.info ? props.info.name : '',
            lastName: props.info ? props.info.lastName : '',
            dateOfBirth: props.info ? props.info.dateOfBirth : moment(),
            calendarFocused: false,
            gender: props.info ? props.info.gender : 'male',
            formIncompleteError: false
        };
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
        if(dateOfBirth){
            this.setState(() => ({dateOfBirth}));
        }
    };

    //Change calendarFocused in local state
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    //Lead to change password page (Requires integration)
    changePassword = (e) => {
        e.preventDefault();
        console.log('change password');

        //TO-DO Modify password and update in database
    }

    //Submit new user information
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.state.name === '' || this.state.lastName === ''){
            this.setState(() => ({formIncompleteError: true}));
        }else{
            this.setState(() => ({formIncompleteError: false}));
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
                        {
                            //Name input field
                        }
                        <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                    
                        <br/>
                        {
                            //Last name input field
                        }
                        <label>{this.props.lang === 'English' ? 'Last Name' : 'Apelido'}:</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange}/>

                        <br/>
                        {
                            //Date of birth input field
                        }
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

                        <DatePicker
                        selected={this.state.dateOfBirth}
                        onChange={this.onDateChange}
                        />

                        
                        <br/>
                        {
                            //Gender radio selector
                        }
                        <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                        <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                        {
                            //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Gender' : 'Género'} <br/>
                        }

                        {
                            //Change password button
                        }
                        <button onClick={this.changePassword}>{this.props.lang === 'English' ? 'Change Password' : 'Modificar Contraseña'} </button>

                        {
                            //Error message displayed if there is a missing field
                        }
                        {this.state.formIncompleteError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all fields before saving.</p> : <p>Por favor, llene todos los espacios antes de guardar la información.</p>}
                        </div>}

                        {
                            //Submit button
                        }
                        <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Save' : 'Guardar'}</button>
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
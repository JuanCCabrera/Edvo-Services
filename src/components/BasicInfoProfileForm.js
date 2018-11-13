import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {connect} from 'react-redux';
import axios from 'axios';
import auth0Client from '../Auth';

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

class BasicInfoProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            props: props,
            name: props.info ? props.info.name : '',
            lastName: props.info ? props.info.lastName : '',
            dateOfBirth: props.info ? props.info.dateOfBirth : moment(),
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
            console.log("DOB: ", response.data.info[0].dob);
            this.setState({   
            name: response.data.info[0].name,
            lastName: response.data.info[0].lastname,
            gender: response.data.info[0].gender,
            dateOfBirth: moment(response.data.info[0].dob)
        });
        })
        console.log("TOKEN BASIC: ", auth0Client.getIdToken());
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

    changePassword = (e) => {
        e.preventDefault();
        reset();

        //TO-DO Modify password and update in database
    }

    onSubmit = (e) => {
        e.preventDefault();
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
                        <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                    
                        <br/>
                        <label>{this.props.lang === 'English' ? 'Last Name' : 'Apelido'}:</label>
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
                            //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Gender' : 'Género'} <br/>
                        }

                        <button onClick={this.changePassword}>{this.props.lang === 'English' ? 'Change Password' : 'Modificar Contraseña'} </button>

                        {this.state.formIncompleteError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all fields before saving.</p> : <p>Por favor, llene todos los espacios antes de guardar la información.</p>}
                        </div>}
                        <button onClick={this.onSubmit}>{this.props.lang === 'English ' ? 'Save' : 'Guardar'}</button>
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

export default connect(mapStateToProps)(BasicInfoProfileForm);
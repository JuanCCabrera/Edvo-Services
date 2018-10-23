import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link} from 'react-router-dom';

export default class CreateUserForm extends React.Component{
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
                        <h2> Create New User </h2>
                        <br/>

                        <label>Email:</label>
                        <input type="text" placeholder = "Email" value = {this.state.email} onChange={this.onEmailChange}/>
        
                        <br/>
                        <label>Password:</label>
                        <input type="password" placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
        
                        <br/>
                        <label>Confirm Password:</label>
                        <input type="password" placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>

                        <br/>
                        <label>Name:</label>
                        <input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>
                    
                        <br/>
                        <label>Last Name:</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange}/>

                        <br/>
                        <label>Date of Birth:</label>
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
                        <label>Gender:</label>
                        <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> Male<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> Female<br/>
                        <input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> Other <br/>
                    
                        <br/>
                        <label>Level of Education:</label>
                        <br/>
                        <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> Associate Degree<br/>
                        <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> Bachelor's Degree<br/>
                        <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> Master's Degree<br/>
                        <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/> Ph.D.<br/>
                     
                        <br/>
                        <label>User Type:</label>
                        <br/>
                        <input type="radio" name="type" value= "school" checked={this.state.type === 'school'} onChange = {this.onTypeChange}/> School<br/>
                        <input type="radio" name="type" value= "mentor" checked={this.state.type === 'mentor'} onChange = {this.onTypeChange}/> Mentor<br/>
                        <input type="radio" name="type" value= "admin" checked={this.state.type === 'admin'} onChange = {this.onTypeChange}/> Admin<br/>
                        
                        <br/>
                        <label>Institution ID:</label>
                        <input type="text" placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
        
                        <br/>
                        <Link to="/admin/settings/users"><button>View User List</button></Link>
                        <button onClick={this.onSubmit}>Create</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}


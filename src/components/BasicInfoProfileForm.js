import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class BasicInfoProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: props.info ? props.info.name : '',
            lastName: props.info ? props.info.lastName : '',
            dateOfBirth: props.info ? props.info.dateOfBirth : moment(),
            calendarFocused: false,
            gender: props.info ? props.info.gender : 'male'
        };
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
        console.log('change password');

        //TO-DO Modify password and update in database
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');

        //TO-DO Modify user data in database
    }

    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                    <div>
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
                    
                        <button onClick={this.changePassword}>Change Password</button>
                        <button onClick={this.onSubmit}>Save</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}
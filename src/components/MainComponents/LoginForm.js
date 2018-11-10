import React from 'react';

//NOT USED** Kept in case Auth0 service is discontinued. 

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loginError: ''
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


    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.email){
            this.setState(() => ({emailError: 'Please fill the Email field.'})); 
        }else if(!this.state.password){
            this.setState(() => ({passwordError: 'Please fill the Password field.'})); 
        }else{
            this.setState(() => ({emailError: '', passwordError: '', loginError: ''}));
            this.props.onSubmit({
                email: this.state.email,
                password: this.state.password
            });
        }
    }
    render(){
        return(
            <div>
                <h2>Login</h2>

                {this.state.contactError && <p>{this.state.contactError}</p>}
                <form onSubmit = {this.onSubmit}>
                    
                    <label>Email</label>
                    <br/>
                    <input
                    type = "text"
                    placeholder = "Email"
                    value = {this.state.email}
                    onChange = {this.onEmailChange}/>
                    {this.state.emailError && <p>{this.state.emailError}</p>}
               
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input
                    type = "text"
                    placeholder = "Password"
                    value = {this.state.password}
                    onChange = {this.onPasswordChange}/>
                    {this.state.passwordError && <p>{this.state.passwordError}</p>}
               
                    {this.state.loginError && <p>{this.state.loginError}</p>}
                    <br/>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

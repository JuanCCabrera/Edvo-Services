import React from 'react';
import { connect } from 'react-redux';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            contactError: '' 
        };
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onMessageChange = (e) => {
        const message = e.target.value;
        this.setState(() => ({message}));
    }


    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name || !this.state.email || !this.state.message){
            this.setState(() => ({contactError: 'Please fill all blank fields'})); 
        }else{
            this.setState(() => ({contactError: ''}));
            this.props.onSubmit({
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            });
        }
    }
    render(){
        return(
            <div>
                {this.props.lang === 'English' ? <h5>Want to know more?</h5> : <h5>Desea conocer más?</h5>}
                {this.props.lang === 'English' ? <h5>Contact Us</h5> : <h5>Contáctenos</h5>}
                {this.state.contactError && <p>{this.state.contactError}</p>}
                <form onSubmit = {this.onSubmit}>
                    <input
                    type = "text"
                    placeholder = "Name"
                    value = {this.state.name}
                    onChange = {this.onNameChange}/>

                    <input
                    type = "text"
                    placeholder = "Email"
                    value = {this.state.email}
                    onChange = {this.onEmailChange}/>
                    <br/>
                    <input
                    type = "text"
                    placeholder = "Message"
                    value = {this.state.message}
                    onChange = {this.onMessageChange}/>

                    <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Send' : 'Enviar'}</button>
                </form>
                <p>Email: info@edvotech.com</p>
                <p>Tel: 787-375-7094</p>
                <p>{this.props.lang === 'English' ? 'Address' : 'Dirección Postal'}: 1250 Ave. Juan Ponce de León Ste. 400 San Juan, PR 00907</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

export default connect(mapStateToProps)(ContactForm);

import React from 'react';
import { connect } from 'react-redux';

/**
 * Form used so a user may send his or her doubts to Edvo Tech's staff. 
 */
class ContactForm extends React.Component{
    constructor(props){
        super(props);
        //The form must include a user's name, email and a message. 
        this.state = {
            name: '',
            email: '',
            message: '',
            contactError: false 
        };
    }

    //Change name in local state. 
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    //Change email in local state
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    //Change message in local state
    onMessageChange = (e) => {
        const message = e.target.value;
        this.setState(() => ({message}));
    }


    //Submit contact form
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name || !this.state.email || !this.state.message){   //Generate error if there are missing fields
            this.setState(() => ({contactError: true})); 
        }else{  //Otherwise, submit form information
            this.setState(() => ({contactError: false}));
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
            {
                //Form header
            }
                {this.props.lang === 'English' ? <h5>Want to know more?</h5> : <h5>Desea conocer más?</h5>}
                {this.props.lang === 'English' ? <h5>Contact Us</h5> : <h5>Contáctenos</h5>}
                {
                    //Error message displayed if there is a missing field
                }
                {this.state.contactError === true && 
                <div className="text-danger">
                    {this.props.lang === 'English' ? <p>Please fill all blank fields.</p> : <p>Por favor, llene todos los espacios en blanco.</p>}
                </div>}

                <form onSubmit = {this.onSubmit}>
                    {
                        //Name input field
                    }
                    <input
                    type = "text"
                    placeholder = "Name"
                    value = {this.state.name}
                    onChange = {this.onNameChange}/>

                    {
                        //Email input field
                    }
                    <input
                    type = "text"
                    placeholder = "Email"
                    value = {this.state.email}
                    onChange = {this.onEmailChange}/>
                    <br/>
                    {
                        //Message input field
                    }
                    <input
                    type = "textarea"
                    placeholder = "Message"
                    value = {this.state.message}
                    onChange = {this.onMessageChange}/>

                    {
                        //Submit button
                    }
                    <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Send' : 'Enviar'}</button>
                </form>
                {
                    //Company contact information
                }
                <p>Email: info@edvotech.com</p>
                <p>Tel: 787-375-7094</p>
                <p>{this.props.lang === 'English' ? 'Address' : 'Dirección Postal'}: 1250 Ave. Juan Ponce de León Ste. 400 San Juan, PR 00907</p>
            </div>
        );
    }
}

//Map current language to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

//Connect component to controller
export default connect(mapStateToProps)(ContactForm);

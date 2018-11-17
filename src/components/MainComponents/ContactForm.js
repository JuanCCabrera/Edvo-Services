import React from 'react';
import { connect } from 'react-redux';
import { setSuccessModal } from '../../actions/successModal';

/**
 * Form used so a user may send his or her doubts to Edvo Tech's staff. 
 */
class ContactForm extends React.Component{
    constructor(props){
        super(props);
        //The form must include a user's name, email and a message. 
        this.state = {
            name: '',
            nameError: '',

            email: '',
            emailError: '',

            message: '',
            messageError: '',

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

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Update error messages if language is changed. 
            if(this.props.lang === 'English'){
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'The name field must contain text.'}));
                }
                if(this.state.emailError){
                    this.setState(() => ({emailError: 'Enter a valid email address.'}));
                }
                if(this.state.messageError){
                    this.setState(() => ({messageError: 'The message field must contain text.'}));
                }
            }else{
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.emailError){
                    this.setState(() => ({emailError: 'Escriba una dirección electrónica valida.'}))
                }
                if(this.state.messageError){
                    this.setState(() => ({messageError: 'El campo del mensaje debe contener texto.'}))
                }
            }
        }
    }


    //Submit contact form
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name || !this.state.email || !this.state.message){   //Generate error if there are missing fields
            this.setState(() => ({contactError: true})); 
        }else if(this.state.nameError || this.state.emailError || this.state.messageError){
            this.setState(() => ({contactError: true}))
        }else{  //Otherwise, submit form information
            this.setState(() => ({contactError: false}));
            this.props.dispatch(setSuccessModal());
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

                <form onSubmit = {this.onSubmit}>
                    {
                        //Name input field
                    }
                    <input
                    type = "text"
                    placeholder = "Name" 
                    maxLength="100"
                    onBlur={() => {
                        //Check if the name field only contains spaces. 
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
                    value = {this.state.name}
                    onChange = {this.onNameChange}/>

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

                    {
                        //Email input field
                    }
                    <input
                    type = "text"
                    placeholder = "Email"
                    maxLength="100"
                    onBlur={() => {
                        //Check if the email field matches the expected email address format. 
                        if(!this.state.email.toLowerCase().match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b$/)){
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

                    {
                        //Message input field
                    }
                    <textarea
                    type = "text"
                    placeholder = "Message"
                    maxLength="4000"
                    onBlur={() => {
                        //Check if the message field only contains spaces. 
                        if(this.state.message.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({messageError: 'The message field must contain text.'}));
                            }else{
                                this.setState(() => ({messageError: 'El campo del mensaje debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({messageError: ''}));
                        }
                    }}
                    value = {this.state.message}
                    onChange = {this.onMessageChange}/>

                    {
                        //Message error
                    }
                    {this.state.messageError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.messageError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //General error displayed if there is any error in the form or if required fields are empty. 
                    }
                    {this.state.contactError === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>Please fill all the fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                    </div>}

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

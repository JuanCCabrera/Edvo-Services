import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
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
   <div className="Parallax-Image Contact">
      <div className="Contact-Content">
         <div className="row">
            <div className="col-md-4 col-md-offset-3">
               <h5 className="Want Contact-Font">
               {this.props.lang === 'English' ? 
                  <span>Want to know more?</span>
                  : 
                  <span>¿Desea conocer más?</span>
                  }
               </h5>
               {this.props.lang === 'English' ? 
               <h5 className="Contact-Font">Contact Us</h5>
               : 
               <h5 className="Contact-Font">Contáctenos</h5>
               }
            </div>
         </div>
         <form onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
               <div className="col-md-offset-3 col-md-3">
                  <div className="form-group">
                  <input
                  className="form-control"
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
                    {this.state.nameError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.nameError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                  <input
                  className="form-control"
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
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-md-offset-3 col-md-6">
                  <div className="form-group">
                  <textarea
                  id="form_message" name="message" className="form-control" placeholder="Message" rows="4"
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
               {this.state.contactError === true && 
                    <div className="text-danger text-center">
                        {this.props.lang === 'English' ? <p>Please fill all the fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                    </div>}
                  </div>
               </div>
                 <div className="col-md-offset-3 container col-md-6">
               <button className="Contact-Btn" onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Send' : 'Enviar'}</button>
                  
               </div>
            </div>
         </form>
      </div>
   </div>
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

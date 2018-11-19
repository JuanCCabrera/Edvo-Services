import React from 'react';
import { connect } from 'react-redux';
import './Main.css';

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
                     <input id="form_name" type="text" name="name" className="form-control" placeholder="Name"
                        required="required" data-error="Firstname is required."/>
                     <div className="help-block with-errors"></div>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="form-group">
                     <input id="form_email" type="email" name="email" className="form-control" placeholder="Email"
                        required="required" data-error="Valid email is required."/>
                     <div className="help-block with-errors"></div>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-md-offset-3 col-md-6">
                  <div className="form-group">
                     <textarea id="form_message" name="message" className="form-control" placeholder="Message" rows="4"
                        required="required" data-error="Please,leave us a message."></textarea>
                     <div className="help-block with-errors"></div>
                  </div>
               </div>
               <div className="col-md-offset-3 container col-md-6">
                  <input type="submit" className="Contact-Btn" value="Send"/>
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

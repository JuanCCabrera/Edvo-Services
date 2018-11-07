import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import Circle from '../../styles/components/prevStyles/images/circle.png';

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

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

export default connect(mapStateToProps)(ContactForm);

import React from 'react';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';
import { sendLogin } from '../../actions/login';
import auth0Client from '../../Auth';
import axios from 'axios';
import './Login.css';

const signOut = (props) => {
    auth0Client.signOut();
    console.log("HISOTRY: ", props.history);
    props.history.replace('/');
  };

  const reset = () => {
    console.log("RESETTING");
    axios.post('https://edvo-test.auth0.com/dbconnections/change_password', {
      client_id: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      email: auth0Client.getProfile().email,
      connection: 'Username-Password-Authentication' ,
      json: true
    },
    {headers: { 'content-type': 'application/json' }});
  };

const LoginPage = (props) => (
    <div>
        <div className="Edvo-Shadow">
        <h1 className="text-center">Learn. Teach. Repeat</h1>
        <div className="container row">
<div className="Login container-fluid text-center col-md-offset-5 col-lg-3">

        {
            !auth0Client.isAuthenticated() &&
            <button onClick={auth0Client.signIn}>{props.lang === 'English' ? 'Sign In' : 'Registrarse'}</button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              <button className="SignUp-Button" onClick={() => {signOut(props)}}>{props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}</button>
            </div>
          }
          <p className="text-bold">{localStorage.getItem('loginError')}</p> 
          </div>
        <div className="Register text-center col-md-offset-1 container-fluid col-lg-3">
            <div>
            <img className="Materials-Img-S" src="http://localhost:8080/static/images/materials.png" />
                {props.lang === 'English' ? 
                <div>
                    <h6>Join the community of schools</h6>
                    <h6>who will evolve education!</h6>
                    <h6>Don't miss out the opportunity of</h6>
                    <h6>having personalized recommendation</h6>
                    <h6>on teaching and learning.</h6>
                </div> : <div>
                    <h6>Únete a la comunidad de instituciones</h6>
                    <h6>que revolucionarán la educación</h6>
                    <h6>No pierda la oportunidad de</h6>
                    <h6>tener sugerencias personalizadas</h6>
                    <h6>sobre enseñanza y aprendizaje.</h6>
                </div>
                }
                
          {
            auth0Client.isAuthenticated() &&
            <div>
              <button className="SignUp-Button" onClick={() => {signOut(props)}}>{props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}</button>
            </div>
          }
            </div>
        </div>
</div>
</div>
        <div>
            <ContactForm
            onSubmit={(contact) => {
            props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

export default connect(mapStateToProps)(LoginPage);
import React from 'react';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';
import { sendLogin } from '../../actions/login';
import auth0Client from '../../Auth';
import axios from 'axios';

/**
 * Signs user out from their account and moves him or her to the Main page. 
 * @param {*} props - Default component properties
 */
const signOut = (props) => {
    auth0Client.signOut();
    console.log("HISOTRY: ", props.history);
    props.history.replace('/');
  };

/**
 * Attempt to acquire user authentication from database. 
 */
const reset = () => {
    axios.post('https://edvo-test.auth0.com/dbconnections/change_password', {
      client_id: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      email: 'daniel.rodriguez22@upr.edu',
      connection: 'Username-Password-Authentication' ,
      json: true
    },
    {headers: { 'content-type': 'application/json' }});
  };

/**
 * The Login page contains buttons to login and register to the application through the Auth0 third-party client. 
 * Additionally, it contains static text to motivate users to sign up to the service. 
 * @param {*} props - Contains default properties and current language state
 */
const LoginPage = (props) => (
    <div>
        
        {
            //Page title
        }
        <h1>Learn. Teach. Repeat</h1>
        
        {/*<div>
            <LoginForm
            onSubmit={(login_info) => {
            props.dispatch(sendLogin(login_info));
            }}/>
        </div>*/}

        {
            !auth0Client.isAuthenticated() &&
            <button onClick={auth0Client.signIn}>{props.lang === 'English' ? 'Login' : 'Login'}</button>
          }
          {
            !auth0Client.isAuthenticated() &&
            <button onClick={auth0Client.signIn}>{props.lang === 'English' ? 'Register' : 'Registrarse'}</button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
              <button onClick={() => {signOut(props)}}>{props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}</button>
              <button onClick={() => {reset()}}>{props.lang === 'English' ? 'Reset Password' : 'Restablecer Contraseña'}</button>
            </div>
          }

        {
            //Static text
            //"Join us" section
        }
        <div>
            <span>MATERIALS_IMG</span>
            <div>
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
            </div>
        </div>

        {
            //Contact form
        }
        <div>
            <ContactForm
            onSubmit={(contact) => {
            props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
);

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

//Connect component to controller. 
export default connect(mapStateToProps)(LoginPage);
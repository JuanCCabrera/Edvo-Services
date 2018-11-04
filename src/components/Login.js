import React from 'react';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../actions/contact';
import { sendLogin } from '../actions/login';
import auth0Client from '../Auth';
import axios from 'axios';

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
        {
        !auth0Client.isAuthenticated() &&
        <button onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button onClick={() => {signOut(props)}}>Sign Out</button>
          <button onClick={() => {reset()}}>Reset Password</button>
        </div>
      }
        <h1>Learn. Teach. Repeat</h1>
        <div>
            <LoginForm
            onSubmit={(login_info) => {
            props.dispatch(sendLogin(login_info));
            }}/>
        </div>

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
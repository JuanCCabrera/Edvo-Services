import React from 'react';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';
import { sendLogin } from '../../actions/login';
import auth0Client from '../../Auth';
import axios from 'axios';
import './Login.css';

/**
 * Signs user out from their account and moves him or her to the Main page. 
 * @param {*} props - Default component properties
 */
const signOut = (props) => {
    auth0Client.signOut();
    console.log("HISOTRY: ", props.history);
    props.history.replace('/');
  };

  const reset = () => {
    console.log("RESETTING");
    axios.post('https://edvo-test.auth0.com/dbconnections/change_password', {
      client_id: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      email: auth0Client.getEmail(),
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
        <div className="Edvo-Shadow">
            <h1 className="text-center">{props.lang === 'English' ? 'Learn. Teach. Repeat' : 'Aprenda. Eduque. Repita'}</h1>
            <div className="container row">
                <div className="Login container-fluid text-center col-md-offset-5 col-lg-3">
                    {
                        !auth0Client.isAuthenticated() &&
                        <button onClick={auth0Client.signIn}>
                            <div className="btn btn-item">
                                {props.lang === 'English' ? 'Sign In' : 'Entrar'}
                            </div>
                        </button>
                    }

                        {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <button className="SignUp-Button" onClick={() => {signOut(props)}}>
                                <div className="btn btn-item">
                                    {props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}
                                </div>
                            </button>
                        </div>
                        }

                        <p className="text-bold">{localStorage.getItem('loginError')}</p> 
                </div>
                <div className="Register text-center col-md-offset-1 container-fluid col-lg-3">
                    <div>
                    <img className="Materials-Img-S" src="http://localhost:8080/static/images/materials.png" />
                        {props.lang === 'English' ? 
                        <div>
                            <p>Join the community of schools
                                who will evolve education!</p>
                            <p>Don't miss out the opportunity of
                            having personalized recommendations
                            on teaching and learning.</p>
                        </div> : <div>
                            <p>¡Únete a la comunidad de instituciones
                            que revolucionarán la educación!</p>
                            <p>No pierda la oportunidad de
                            tener sugerencias personalizadas
                            sobre enseñanza y aprendizaje.</p>
                        </div>
                        }
                
          {
            !auth0Client.isAuthenticated() &&
            <button onClick={auth0Client.signIn}>{props.lang === 'English' ? 'Sign Up' : 'Registrarse'}</button>
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
import React from 'react';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';
import { sendLogin } from '../../actions/login';
import {Link} from 'react-router-dom';
import auth0Client from '../../Auth';
import axios from 'axios';
import './Login.css';
import { fromJS } from 'immutable';
import {logSubscriptionStatus, logRegistrationStatus} from '../../actions/loginPage';
import {setLoadingModal} from '../../actions/loadingModal';

/**
 * Signs user out from their account and moves him or her to the Main page. 
 * @param {*} props - Default component properties
 */
const signOut = (props) => {
    auth0Client.signOut();
  };

  const reset = () => {
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
class LoginPage extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){
        //TO-DO: Use this.props.dispatch(logRegistrationStatus({registered: bool})) and this.props.dispatch(logSubscriptionStatus({hasPaidSubscription: bool}))
        //in a request to help determine if the user needs links to the Registration Form or Payment page. 
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/user',  {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{ 
                if(response.status == 201){
                    
                    this.props.dispatch(logRegistrationStatus({registered: true}));
                    this.props.dispatch(logSubscriptionStatus({hasPaidSubscription: response.data.subscription != null ? true : false}));
                }
                this.props.dispatch(setLoadingModal());
            })
            .catch(error => {
                if(error.response.status == 403){
                    this.props.dispatch(logRegistrationStatus({registered: false}));
                    this.props.dispatch(logSubscriptionStatus({hasPaidSubscription: false}))
                }
                this.props.dispatch(setLoadingModal());
            });
    }

    render(){
    return(
            <div>
                <div className="Edvo-Shadow">
                    <h1 className="text-center">{this.props.lang === 'English' ? 'Learn. Teach. Repeat' : 'Aprenda. Eduque. Repita'}</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3"/>
                            <div className="text-center col-sm-6">
                                <div className="Register">
                                <img className="Materials-Img-S" src="https://beta.edvotech.com/static/images/materials.png" />
                                    {this.props.lang === 'English' ? 
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

                                        <div className="row">
                                            <div className="col-sm-3"/>
                                            <div className="col-sm-6">
                                                <br/>
                                                <span className="text-bold text-danger"> {localStorage.getItem('loginError')}</span>
                                                {
                                                    !auth0Client.isAuthenticated() &&
                                                    <div>

                                                        <button onClick={auth0Client.signIn}>
                                                            <div className="btn btn-item">
                                                                {this.props.lang === 'English' ? 'Sign In' : 'Entrar'}
                                                            </div>
                                                        </button>

                                                        <button onClick={auth0Client.signIn} style={{marginBottom: '1rem'}}>
                                                            <div className="btn btn-item">
                                                            {this.props.lang === 'English' ? 'Register' : 'Registrarse'}
                                                            </div>
                                                        </button>
                                                    </div>
                                                }
                        
                                                {
                                                auth0Client.isAuthenticated() &&
                                                    <div>
                                                        <div>
                                                            <button className="SignUp-Button" onClick={() => {signOut(this.props)}}>
                                                                <div className="btn btn-item" style={{marginBottom: '1rem'}}>
                                                                    {this.props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}
                                                                </div>
                                                            </button>
                                                        </div>

                                                    {!this.props.loginPage.registered && 
                                                        <div>
                                                            <Link to={'/register'}>
                                                                <button>
                                                                    <div className="btn btn-item" style={{marginBottom: '1rem'}}>{this.props.lang === 'English' ? 'Continue Registration' : 'Continuar Registración'}</div>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    }

                                                    {(this.props.loginPage.registered && !this.props.loginPage.hasPaidSubscription && auth0Client.getRole() == "teacher") && 
                                                        <div>
                                                            <Link to={'/teacher/settings/plans/payment'}>
                                                                <button>
                                                                    <div className="btn btn-item" style={{marginBottom: '1rem'}}>{this.props.lang === 'English' ? 'Pay Subscription' : 'Pagar Suscripción'}</div>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    }
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-sm-4"/>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-3"/>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactForm
                    onSubmit={(contact) => {
                    this.props.dispatch(sendContactForm(contact));
                    }}/>
                </div>
            </div>
        );
    }
}

//Map current language state to component properties.
const mapStateToProps = (state) => {
    
    return {
        lang: state.language.lang,
        loginPage: state.loginPage
    }
} 

//Connect component to controller. 
export default connect(mapStateToProps)(LoginPage);
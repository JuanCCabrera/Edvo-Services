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

/**
 * The Login page contains buttons to login and register to the application through the Auth0 third-party client. 
 * Additionally, it contains static text to motivate users to sign up to the service. 
 * @param {*} props - Contains default properties and current language state
 */
class LoginPage extends React.Component{
    constructor(props){
        super(props);

    }

    //Load user registration and subscription status when Login page mounts. 
    componentWillMount(){
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/user',  {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            }).then(response =>{ 
                if(response.status == 201){
                    //Log registration and subscription status as true. 
                    this.props.dispatch(logRegistrationStatus({registered: true}));
                    this.props.dispatch(logSubscriptionStatus({hasPaidSubscription: response.data.subscription != null ? true : false}));
                }
                this.props.dispatch(setLoadingModal());
            })
            .catch(error => {
                if(error.response.status == 403){
                    //Log registration and subscription status as false. 
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
                            {
                                //Login page "Join Us" image and message displayed if user is not registered or does not have an active subscription. 
                            }
                                <div className="Register">
                                    { !(auth0Client.isAuthenticated() && (this.props.loginPage.hasPaidSubscription ||  (auth0Client.getRole() != "teacher" && auth0Client.getRole() != null))) &&
                                        <div>
                                            <img className="Materials-Img-S" src="https://beta.edvotech.com/static/images/materials.png" />
                                                {this.props.lang === 'English' ? 
                                                <div>
                                                    <p>Join the community of schools
                                                        that will evolve education!</p>
                                                    <p>Don't miss out the opportunity to
                                                    have personalized recommendations
                                                    about teaching and learning.</p>
                                                </div> : <div>
                                                    <p>¡Únete a la comunidad de instituciones
                                                    que revolucionarán la educación!</p>
                                                    <p>No pierda la oportunidad de
                                                    tener sugerencias personalizadas
                                                    sobre enseñanza y aprendizaje.</p>
                                                </div>
                                                }
                                        </div>
                                    }

                                    {
                                        //Login page "Come back soon!" image and thank you message displayed if user is logged in and has evar had an active subscription. 
                                    }
                                    { (auth0Client.isAuthenticated() && (this.props.loginPage.hasPaidSubscription || (auth0Client.getRole() != "teacher" && auth0Client.getRole() != null))) && 
                                        <div style={{marginTop: '3rem'}}>
                                            {this.props.lang === 'English' ? <img className="Materials-Img-S" src="https://beta.edvotech.com/static/images/comebacksoonWHITEBG-min.png" />
                                            : <img className="Materials-Img-S" src="https://beta.edvotech.com/static/images/vuelvapronto.png" />}
                                            
                                                {this.props.lang === 'English' ? 
                                                <div>
                                                    <p>Thank you for contributing to the community of schools
                                                        that will evolve education!</p>
                                                    <p>Take advantage of the opportunity to
                                                    have personalized recommendations
                                                    about teaching and learning.</p>
                                                </div> : <div>
                                                    <p>¡Gracias por su contribución a la comunidad de instituciones
                                                    que revolucionarán la educación!</p>
                                                    <p>Aproveche la oportunidad de
                                                    tener sugerencias personalizadas
                                                    sobre enseñanza y aprendizaje.</p>
                                                </div>
                                                }
                                        </div>
                                    }

                                        <div className="row">
                                            <div className="col-sm-3"/>
                                            <div className="col-sm-6">
                                                <br/>
                                                <span className="text-bold text-danger"> {localStorage.getItem('loginError')}</span>
                                                {//Display Login and Register buttons if user has not been authenticated through login. 
                                                    !auth0Client.isAuthenticated() &&
                                                    <div style={{marginBottom: '1rem'}}>
                                                        <button className="btn btn-item" onClick={auth0Client.signIn}>
                                                            <div>
                                                                {this.props.lang === 'English' ? 'Sign In' : 'Entrar'}
                                                            </div>
                                                        </button>
                                                    <span> </span>
                                                        <button className="btn btn-item" onClick={auth0Client.signUp}>
                                                            <div>
                                                                {this.props.lang === 'English' ? 'Register' : 'Registrarse'}
                                                            </div>
                                                        </button>
                                                    </div>
                                                }
                        
                                                {
                                                //Display Log Out button if user has been authenticated through login. 
                                                auth0Client.isAuthenticated() &&
                                                    <div style={{marginBottom: '1rem'}}>
                                                        <div>
                                                            <button className="SignUp-Button" onClick={() => {signOut(this.props)}}>
                                                                <div className="btn btn-item" style={{marginBottom: '1rem'}}>
                                                                    {this.props.lang === 'English' ? 'Sign Out' : 'Desconectarse'}
                                                                </div>
                                                            </button>
                                                        </div>

                                                    {
                                                        //Display Continue Registration button if user is logged in but does not have registered information. 
                                                    }
                                                    {!this.props.loginPage.registered && 
                                                        <div>
                                                            <Link to={'/register'}>
                                                                <button>
                                                                    <div className="btn btn-item" style={{marginBottom: '1rem'}}>{this.props.lang === 'English' ? 'Continue Registration' : 'Continuar Registración'}</div>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    }

                                                    {
                                                        //Display Pay Subscription button if user is logged in and registered, but has not owned an active subscription. 
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
                {
                    //Contact Form
                }
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

//Map current language and user login status to component properties.
const mapStateToProps = (state) => {
    
    return {
        lang: state.language.lang,
        loginPage: state.loginPage
    }
} 

//Connect component to controller. 
export default connect(mapStateToProps)(LoginPage);
import React from 'react';
import Parallax from 'parallax-js';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';

/**
 * About page of the application. This page gives a brief overview of Edvo Tech's mission as a company. 
 * @param {*} props - Component properties which includes current language state. 
 */
const AboutPage = (props) => (
    <div>
        {
            //Page title
        }
        <div className="text-center about__title">
            {props.lang === 'English' ? 
            <div>
                <p>Who we are</p>
            </div> : <div>
                <p>¿Quiénes somos?</p>
            </div>
            }
            
            <hr className="break"/>
        </div>

        {
            //"What we do" section
        }
        <div className="container-fluid about__body">
            <div className="row row__margin">
                <div>
                    <div className="col-sm-12 text-center">
                        {props.lang === 'English' ? 
                        <div>
                            <h2 className="about__subtitle">What we do</h2>
                            <h4 className="about__sub__text">An educator holds the most important profession being the gateway to all other </h4>
                            <h4 className="about__sub__text">professions. With them, we are on our way to Evolve Education!</h4>
                        </div> : <div>
                            <h2 className="about__subtitle">¿Qué hacemos?</h2>
                            <h4 className="about__sub__text">Un educador mantiene la profesión mas importante sobre todas las profesiones.</h4>
                            <h4 className="about__sub__text">Con ellos vamos encaminados a <span className="about__sub__text__bold">¡Evolucionar la Educación!</span></h4>
                        </div>
                        }
                    </div>
                </div>
            </div>
            {
                //"Why we do it" section
            }
            <div className="row mid__row__margin">
                <div>
                    <div className="col-sm-3"/>
                    <div className="col-sm-3 text-center">
                        {props.lang === 'English' ? 
                        <div>
                            <p className="about__subtitle__2">Why we do it</p>
                            <p className="text-muted">We understand the great challenges that come with the responsibility of being an educator and that leads us to support them in every step of the process.</p>
                        </div> : <div>
                            <p className="about__subtitle__2">¿Por qué lo hacemos?</p>
                            <p className="text-muted">Entendemos los grandes retos que vienen con la responsabilidad de ser un educador, lo cual nos lleva a querer apoyarlos en cada paso del camino.</p>
                        </div>
                        }
                    </div>

                    {
                        //"How we do it" section
                    }

                    <div className="col-sm-3 text-center">
                        {props.lang === 'English' ? 
                        <div>
                            <p className="about__subtitle__2">How we do it</p>
                            <p className="text-muted">Advocating for quality education and bringing the best practices to educators through innovative professional development opportunities.</p>
                        </div> : <div>
                            <p className="about__subtitle__2">¿Cómo lo hacemos?</p>
                            <p className="text-muted">Defendiendo la educación de calidad y brindando las mejores practicas para educadores através de oportunidades de desarrollo profesional innovadoras.</p>
                        </div>
                        }
                    </div>
                    <div className="col-sm-3"/>
                </div>
            </div>
            {
                //"What others say" section
            }
            <div className="row about__low">
                <div className="col-sm-4"/>
                <div className="col-sm-4 text-center speech-bubble about__others__say">
                        {props.lang === 'English' ? 
                        <div>
                            <p>What others say</p>
                        </div> : <div>
                            <p>¿Qué dicen?</p>
                    </div>
                    }
                </div>
                <div className="col-sm-4"/>
            </div>
            {
                //Links to articles which give additional information about Edvo Tech
            }
            <div className="row">
                <div className="text-center">
                    <div className="col-sm-3 about__low__options">
                    <img src="http://localhost:8080/static/images/logo_endi.png" className="Feature-Img__endi" />
                        <br/>
                        <a href='https://www.elnuevodia.com/negocios/empresas/nota/delrumunadelasalumnasmasinnovadorasdelmundo-2418375' target='_blank'> {props.lang === 'English' ? 'Read article' : 'Leer'} </a>
                    </div>

                    <div className="col-sm-3 about__low__options">
                        <img src="http://localhost:8080/static/images/logo_pre18.png" className="Feature-Img" />
                        <br/>
                        <a href='https://www.elnuevodia.com/negocios/empresas/nota/pre18arrancaracon40empresasboricuas-2405093' target='_blank'> {props.lang === 'English' ? 'Read article' : 'Leer'} </a>
                    </div>

                    <div className="col-sm-3 about__low__options">
                        <img src="http://localhost:8080/static/images/logo_her_campus.png" className="Feature-Img__her__campus" />
                        <br/>
                        <a href='https://www.hercampus.com/school/uprm/purpose-behind-edvo' target='_blank'> {props.lang === 'English' ? 'Read article' : 'Leer'} </a>
                    </div>

                    <div className="col-sm-3 about__low__options">
                        <img src="http://localhost:8080/static/images/logo_mc.png" className="Feature-Img__mc" />
                        <br/>
                        <a href='https://www.metro.pr/pr/noticias/2018/04/12/estudiante-de-mayaguez-recibe-premio-de-mejor-idea-del-futuro.html' target='_blank'> {props.lang === 'English' ? 'Read article' : 'Leer'} </a>
                    </div>
                </div>
            </div>
        </div>
        {
            //Contact Form
        }
        <div>
            <ContactForm
            onSubmit={(contact) => {
            props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
);

//Map current language state to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

//Connect component to controller
export default connect(mapStateToProps)(AboutPage);
import React from 'react';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../actions/contact';
import Can from '../Can';
import { Redirect } from "react-router-dom";
import auth0Client from '../Auth';

const AboutPage = (props) => (
    <Can
    role={auth0Client.getRole}
    perform="school:home"
    yes={() => (
    <div>
        <div>
            {props.lang === 'English' ? 
            <div>
                <h1>Who we are</h1>
            </div> : <div>
                <h1>¿Quiénes somos?</h1>
            </div>
            }
        </div>

        <div>
            {props.lang === 'English' ? 
            <div>
                <h1>What we do</h1>
                <h5>An educator holds the most important profession being the gateway to all other </h5>
                <h5>professions. With them, we are on our way to Evolve Education!</h5>
            </div> : <div>
                <h2>¿Qué hacemos?</h2>
                <h5>Un educador mantiene la profesión mas importante sobre todas las profesiones.</h5>
                <h5>Con ellos vamos encaminados a ¡Evolucionar la Educación!</h5>
            </div>
            }
        </div>

        <div>
            <div>
                {props.lang === 'English' ? 
                <div>
                    <h3>Why we do it</h3>
                    <p>We understand the great challenges that come with the responsibility of being an educator and that leads us to support them in every step of the process.</p>
                </div> : <div>
                    <h3>¿Por qué lo hacemos?</h3>
                    <p>Entendemos los grandes retos que vienen con la responsabilidad de ser un educador, lo cual nos lleva a querer apoyarlos en cada paso del camino.</p>
                </div>
                }
            </div>

            <div>
                {props.lang === 'English' ? 
                <div>
                    <h3>How we do it</h3>
                    <p>Advocating for quality education and bringing the best practices to educators through innovative professional development opportunities.</p>
                </div> : <div>
                    <h3>¿Cómo lo hacemos?</h3>
                    <p>Defendiendo la educación de calidad y brindando las mejores practicas para educadores através de oportunidades de desarrollo profesional innovadoras.</p>
                </div>
                }
            </div>
        </div>

        <div>
            {props.lang === 'English' ? 
            <div>
                <h3>What others say</h3>
            </div> : <div>
                <h3>¿Qué dicen?</h3>
            </div>
            } 
        </div>

        <div>
            <div>
                <span>ENDI_IMG</span>
                <a href='https://www.elnuevodia.com/negocios/empresas/nota/delrumunadelasalumnasmasinnovadorasdelmundo-2418375' target='_blank'> {props.lang === 'English' ? 'Read article>' : 'Leer>'} </a>
            </div>

            <div>
                <span>PRE18_IMG</span>
                <a href='https://www.elnuevodia.com/negocios/empresas/nota/pre18arrancaracon40empresasboricuas-2405093' target='_blank'> {props.lang === 'English' ? 'Read article>' : 'Leer>'} </a>
            </div>

            <div>
                <span>HER_CAMPUS_IMG</span>
                <a href='https://www.hercampus.com/school/uprm/purpose-behind-edvo' target='_blank'> {props.lang === 'English' ? 'Read article>' : 'Leer>'} </a>
            </div>

            <div>
                <span>MCDONALDS_IMG</span>
                <a href='https://www.metro.pr/pr/noticias/2018/04/12/estudiante-de-mayaguez-recibe-premio-de-mejor-idea-del-futuro.html' target='_blank'> {props.lang === 'English' ? 'Read article>' : 'Leer>'} </a>
            </div>
        </div>
        
        <div>
            <ContactForm
            onSubmit={(contact) => {
            props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
    )}
    no={() => <Redirect to="/" />}
    />
    );


const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

export default connect(mapStateToProps)(AboutPage);
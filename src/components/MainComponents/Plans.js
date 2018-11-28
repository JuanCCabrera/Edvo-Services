import React from 'react';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../../actions/contact';
import {NavLink, Redirect} from 'react-router-dom';
import Can from "../../Can";
import auth0 from '../../Auth';
import './Plans.css'

/**
 * Plans page displays a table containing information relating to three subscription plans available. 
 * There are three subscription plans available: Standard, Premium and Absolute Packages. 
 * @param {*} props - Contains default properties and current language state. 
 */
const PlansPage = (props) => (
    <div className="Body-Background">
    <div className="container pt-5 pb-5 text-left Body-Background">
        <table className="table text-white Promo">
        <thead>
        <tr className="text-center">
            <th scope="col" className="No-Border-Top text-center"></th>
            <th scope="col" className="No-Border-Top text-center">
                <h3>{props.lang === 'English' ? 'STANDARD' : 'PAQUETE'}</h3>
                <h3>{props.lang === 'English' ? 'PACKAGE' : 'ESTANDAR'}</h3>
                <h1>$39</h1>
                <p>{props.lang === 'English' ? 'per month' : 'al mes'}</p>
                {console.log("UNDEFINED?????: ", auth0.getSubscribed())}
                <NavLink to={auth0.getSubscribed()} activeclass="is-active" exact={true}>
                            <button className="Subscribe">{props.lang === 'English' ? 'SUBSCRIBE' : 'SUSCRIBIRSE'}</button>
                </NavLink>
            </th>
            <th scope="col" className="No-Border-Top text-center">
                <h3>{props.lang === 'English' ? 'PREMIUM' : 'PAQUETE'} </h3>
                <h3>{props.lang === 'English' ? 'PACKAGE' : 'SUPREMO'} </h3>
                <h1>$59*</h1>
                <p>{props.lang === 'English' ? 'per month' : 'al mes'}</p>
                <br/>
                <br/>
             </th>

            <th scope="col" className="text-center AbsolutePackage">
                <h5 className="text-center">{props.lang === 'English' ? 'LIMITED SPACE AVAILABLE' : 'ESPACIOS LIMITADOS'}</h5>
                <h3>{props.lang === 'English' ? 'ALL-ACCESS' : 'PAQUETE'} </h3>
                <h3>{props.lang === 'English' ? 'PACKAGE' : 'ABSOLUTO'} </h3>
                <h1>$249**</h1>
                <p>{props.lang === 'English' ? 'per educator + 6 months of platform usage' : 'por educador + 6 meses de uso en la plataforma'} </p>
             </th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Weekly recommendations' : 'Recomendaciones semanales'}</h3>
                        <p> {props.lang === 'English' ? 'Over 10 custom recommendations based on the user\'s profile' : 'Sobre 10 recomendaciones personalizadas de acuerdo a su perfil'}</p>
                    </th>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
            <th>
                <h3> {props.lang === 'English' ? 'Q&A with experts' : 'Preguntas y respuestas con expertos'}</h3>
                <p> {props.lang === 'English' ? 'Ask private questions and our team of experts will provide solutions on time management, teaching strategies and technology integration' : 'Pregunte en privado y nuestro grupo de expertos le proveerá soluciones sobre manejo de tiempo, enseñanza e integración tecnológica'} </p>
            </th>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
            <th>
                <h3> {props.lang === 'English' ? 'User metrics' : 'Métricas de usuario'}</h3>
                <p> {props.lang === 'English' ? 'Keep track of your professional development with our metrics on: Performance, Application, Engagement, and Individual Goals' : 'Siga su desarrollo profesional con nuestras métricas sobre: Rendimiento, Aplicación, Participación y Metas Individuales.'}</p>
            </th>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
            <th scope="row">
                <h3> {props.lang === 'English' ? 'Administrative metrics' : 'Métricas administrativas'}</h3>
                <p> {props.lang === 'English' ? 'Get a detailed, graphical report of the professional development metrics of your institution' : 'Obtenga detalladas métricas en reportes o gráficas sobre el desarrollo profesional de su institución'}</p>
            </th>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td></td>
        </tr>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Administrative profile' : 'Perfil administrativo'}</h3>
                        <p> {props.lang === 'English' ? 'Administration\'s vision taken into consideration' : 'La visión de la administración es tomada en consideración'}</p>
                    </th>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
            <td></td>
        </tr>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Immersion pre-event' : 'Pre-evento inmersivo'}</h3>
                        <p> {props.lang === 'English' ? '4-hour workshop on innovative teaching techniques and support using our platform' : 'Taller de 4 horas con técnicas innovadoras de enseñanza y apoyo con nuestra plataforma'}</p>
                    </th>
            <td></td>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Edu-Hackathon' : 'Edu-Hackathon'}</h3>
                        <p> {props.lang === 'English' ? 'Participate in a competitive national event for educators' : 'Participe en competencias nacionales para educadores'}</p>
                    </th>
            <td></td>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Discount' : 'Descuentos'}</h3>
                        <p> {props.lang === 'English' ? 'Get 25 percent off after your first 6 months of platform usage are over' : 'Obtenga 25 porciento de descuento luego de sus primeros 6 meses de uso en la plataforma'}</p>
                    </th>
            <td></td>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        <tr>
        <th>
                        <h3> {props.lang === 'English' ? 'Community' : 'Comunidad'}</h3>
                        <p> {props.lang === 'English' ? 'Join the community of educators through our private Facebook group' : 'Únete a la comunidad de educadores exclusiva en nuestro grupo privado en Facebook'}</p>
                    </th>
            <td></td>
            <td></td>
            <td><i className="text-white ml-5 mt-3 fas fa-check fa-3x"></i></td>
        </tr>
        </tbody>
    </table>

        {
            //Special details section
        }
        <p style={{color: 'white'}}>{props.lang === 'English' ? '* Package meant for purchase by educational institutions $59/month per educator.' : '* Oferta dirigida a instituciones educativas, $59/mes por educador.'}</p>
        <p style={{color: 'white'}}>{props.lang === 'English' ? '** Expires on September 15, 2018.' : '** Expira 15 de Septiembre 2018.'}</p>

    </div>
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
export default connect(mapStateToProps)(PlansPage);
import React from 'react';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';
import {sendContactForm} from '../actions/contact';
import {NavLink} from 'react-router-dom';

const PlansPage = (props) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <h3>{props.lang === 'English' ? 'STANDARD' : 'PAQUETE'} </h3>
                        <h3>{props.lang === 'English' ? 'PACKAGE' : 'ESTANDAR'} </h3>
                        <h1>$39</h1>
                        <p>{props.lang === 'English' ? 'per month' : 'al mes'} </p>
                        <NavLink to="/login" activeClassName="is-active" exact={true}>
                            <button>{props.lang === 'English' ? 'SUBSCRIBE' : 'SUSCRIBIRSE'}</button>
                        </NavLink>
                    </th>
                    <th>
                        <h3>{props.lang === 'English' ? 'PREMIUM' : 'PAQUETE'} </h3>
                        <h3>{props.lang === 'English' ? 'PACKAGE' : 'SUPREMO'} </h3>
                        <h1>$59*</h1>
                        <p>{props.lang === 'English' ? 'per month' : 'al mes'} </p>
                        <NavLink to="/login" activeClassName="is-active" exact={true}>
                            <button>{props.lang === 'English' ? 'SUBSCRIBE' : 'SUSCRIBIRSE'}</button>
                        </NavLink>
                    </th>
                    <th>
                        <h5>{props.lang === 'English' ? 'LIMITED SPACE AVAILABLE' : 'ESPACIOS LIMITADOS'}</h5>
                        <h3>{props.lang === 'English' ? 'ALL-ACCESS' : 'PAQUETE'} </h3>
                        <h3>{props.lang === 'English' ? 'PACKAGE' : 'ABSOLUTO'} </h3>
                        <h1>$249**</h1>
                        <p>{props.lang === 'English' ? 'per educator + 6 months of platform usage' : 'por educador + 6 meses de uso en la plataforma'} </p>
                        <NavLink to="/login" activeClassName="is-active" exact={true}>
                            <button>{props.lang === 'English' ? 'SUBSCRIBE' : 'SUSCRIBIRSE'}</button>
                        </NavLink>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Weekly recommendations' : 'Recomendaciones semanales'}</h3>
                        <p> {props.lang === 'English' ? 'Over 10 custom recommendations based on the user\'s profile' : 'Sobre 10 recomendaciones personalizadas de acuerdo a su perfil'}</p>
                    </th>
                    <td>CHECKMARK_IMG</td>
                    <td>CHECKMARK_IMG</td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Q&A with experts' : 'Preguntas y respuestas con expertos'}</h3>
                        <p> {props.lang === 'English' ? 'Ask private questions and our team of experts will provide solutions on time management, teaching strategies and technology integration' : 'Pregunte en privado y nuestro grupo de expertos le proveerá soluciones sobre manejo de tiempo, enseñanza e integración tecnológica'} </p>
                    </th>
                    <td>
                        CHECKMARK_IMG
                        <p>1 question per month</p>
                    </td>
                    <td>
                        CHECKMARK_IMG
                        <p>5 questions per month</p>
                    </td>
                    <td>
                        CHECKMARK_IMG
                        <p>5 questions per month</p>
                    </td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'User metrics' : 'Métricas de usuario'}</h3>
                        <p> {props.lang === 'English' ? 'Keep track of your professional development with our metrics on: Performance, Application, Engagement, and Individual Goals' : 'Siga su desarrollo profesional con nuestras métricas sobre: Rendimiento, Aplicación, Participación y Metas Individuales.'}</p>
                    </th>
                    <td>CHECKMARK_IMG</td>
                    <td>CHECKMARK_IMG</td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Administrative metrics' : 'Métricas administrativas'}</h3>
                        <p> {props.lang === 'English' ? 'Get a detailed, graphical report of the professional development metrics of your institution' : 'Obtenga detalladas métricas en reportes o gráficas sobre el desarrollo profesional de su institución'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Administrative profile' : 'Perfil administrativo'}</h3>
                        <p> {props.lang === 'English' ? 'Administration\'s vision taken into consideration' : 'La visión de la administración es tomada en consideración'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Immersion pre-event' : 'Pre-evento inmersivo'}</h3>
                        <p> {props.lang === 'English' ? '4-hour workshop on innovative teaching techniques and support using our platform' : 'Taller de 4 horas con técnicas innovadoras de enseñanza y apoyo con nuestra plataforma'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Edu-Hackathon' : 'Edu-Hackathon'}</h3>
                        <p> {props.lang === 'English' ? 'Participate in a competitive national event for educators' : 'Participe en competencias nacionales para educadores'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Discount' : 'Descuentos'}</h3>
                        <p> {props.lang === 'English' ? 'Get 25 percent off after your first 6 months of platform usage are over' : 'Obtenga 25 porciento de descuento luego de sus primeros 6 meses de uso en la plataforma'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

                <tr>
                    <th>
                        <h3> {props.lang === 'English' ? 'Community' : 'Comunidad'}</h3>
                        <p> {props.lang === 'English' ? 'Join the community of educators through our private Facebook group' : 'Únete a la comunidad de educadores exclusiva en nuestro grupo privado en Facebook'}</p>
                    </th>
                    <td></td>
                    <td></td>
                    <td>CHECKMARK_IMG</td>
                </tr>

            </tbody>
        </table>

        <p>{props.lang === 'English' ? '* Package meant for purchase by educational institutions $59/month per educator.' : '* Oferta dirigida a instituciones educativas, $59/mes por educador.'}</p>
        <p>{props.lang === 'English' ? '** Expires on September 15, 2018.' : '** Expira 15 de Septiembre 2018.'}</p>

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

export default connect(mapStateToProps)(PlansPage);
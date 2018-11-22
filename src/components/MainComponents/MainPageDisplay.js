import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import ThreeImageList from './ThreeImageList'
import './Main.css';

/**
 * This is the body of the Main page, which includes general information about Edvo Tech as pseudo-static text. 
 * @param {*} props - Contains default properties and the current language state. 
 */
const MainPageDisplay = (props) => (
    <div className="Main">
    <div className="Parallax-Title">
        {props.lang === 'English' ? 
        <div className="container Title">
            <h1>EDUCATION</h1> 
            <h1>EVOLVED</h1>
            <div className="container Join">
            <h4>Join the community of educators who are</h4>
            <h4>evolving education</h4>
            <div>
            <NavLink to="/login" activeClassName="is-active" exact>
                <button className="Join btn mb-5 mt-5">{props.lang === 'English' ? 'JOIN' : 'ÚNETE'}</button>
            </NavLink>
            </div>
            </div>
        </div> : 
        <div className="container Title">
            <h1>EDUCATION</h1>
            <h1>EVOLVED</h1>
            <div className="container Join">
            <h4>Únete a la comunidad de educadores</h4>
            <h4>que esta revolucionando la educación</h4>
            <div>
            <NavLink to="/login" activeClassName="is-active Join" exact>
                <button className="btn mb-5 mt-5">{props.lang === 'English' ? 'JOIN' : 'ÚNETE'}</button>
            </NavLink>
            </div>
            </div>
        </div>
        }

        {
            //Navigation button to Login page.
        }
        <div>
        </div>
    </div>

        <div className="Mission pt-5 pb-5">
            <h1>edvo</h1>            
            <hr className="Break"/>
            {props.lang === 'English' ? 
            <div className="Mission">
                <h2>We make the process of teaching easier.</h2>
                <h4>By providing the first professional development platform for edcuators,</h4>
                <h4>we enable them to innovate, work efficiently and effectively.</h4>
            </div> : <div className="Mission">
                <h2>Hacemos el proceso de enseñanza más fácil</h2>
                <h4>Al proveer la primera plataforma de desarrollo personal para educadores,</h4>
                <h4>permitimos que innoven y trabajen más efectiva y eficientemente.</h4>
            </div>
            }
        </div>

        {
            //Static text description "DESIGN" section
        }
        <div>
            <div className="container-fluid row text-center Tools">
                {props.lang === 'English' ? 
                <div className="col-md-4">
                <img src="http://localhost:8080/static/images/flower.png" className="Feature-Img" />
                    <h2>DESIGN</h2>
                    <h5>Collaborating with you</h5>
                    <h5>to design better</h5>
                    <h5>learning experiences</h5>
                </div> : <div className="col-md-4">
                    <img src="http://localhost:8080/static/images/flower.png" className="Feature-Img" />
                    <h2>DISEÑO</h2>
                    <h5>Colaborando contigo</h5>
                    <h5>para diseñar mejores</h5> 
                    <h5>experiencias de aprendizaje.</h5>
                </div>
                }
                {props.lang === 'English' ? 
                <div className="col-md-4">
                <img src="http://localhost:8080/static/images/circle.png" className="Feature-Img" />
                    <h2>MANAGEMENT</h2>
                    <h5>Helping you better</h5>
                    <h5>manage your time.</h5>
                </div> : <div className="col-md-4">
                <img src="http://localhost:8080/static/images/circle.png" className="Feature-Img" />
                    <h2>MANEJO</h2>
                    <h5>Ayudandote a manejar</h5> 
                    <h5>tu tiempo eficientemente.</h5>
                </div>
                }
                {props.lang === 'English' ? 
                <div className="col-md-4">
                <img src="http://localhost:8080/static/images/cross.png" className="Feature-Img" />
                    <h2>TOOLS</h2>
                    <h5>Providing the tools</h5> 
                    <h5>needed to stay</h5> 
                    <h5>up to date</h5> 
                    <h5>with technology.</h5>
                </div> : <div className="col-md-4">
                <img src="http://localhost:8080/static/images/cross.png" className="Feature-Img" />
                    <h2>HERRAMIENTAS</h2>
                    <h5>Brindandote las herramientas</h5>
                    <h5>necesarias para que</h5> 
                    <h5>te mantengas</h5> 
                    <h5>al día con la tecnología.</h5>
                </div>
                }
            </div>
            
        </div>
            
        <div className="How">
        <div className="How-Title">
            {props.lang === 'English' ? 
            <div className="text-center">
                <h1>How does it work?</h1>
            </div> : <div className="text-center">
                <h1>¿Cómo funciona?</h1>
            </div>
            }
        </div>

        {
            //Steps to join the application 
        }
        <div> 
            <div className="container-fluid row text-center">
                {props.lang === 'English' ? 
                <div className="col-md-4">
                    <h2>1. Fill your profile</h2>
                    <ul>
                        <li>Class size</li>
                        <li>Academic level</li>
                        <li>Subject</li>
                        <img src="http://localhost:8080/static/images/persons.png" className="How-Img" />
                    </ul>
                </div> : <div className="col-md-4">
                    <h2>1. Completa tu perfil</h2>
                    <ul>
                        <li>Cantidad de estudiantes</li>
                        <li>Nivel académico</li>
                        <li>Materia</li>
                        <img src="http://localhost:8080/static/images/persons.png" className="How-Img" />
                    </ul>
                   
                </div>
                }
                {props.lang === 'English' ? 
                <div className="col-md-4 mt-5">
                    <h2>2. Tell us your challenges</h2>
                    <ul>
                        <li>How can I increase engagement?</li>
                        <li>How can I include experiments?</li>
                        <img src="http://localhost:8080/static/images/display.png" className="How-Img" />
                    </ul>
                </div> : <div className="col-md-4 mt-5">
                    <h2>2. Cuéntanos tus retos</h2>
                    <ul>
                        <li>¿Cómo puedo aumentar la participación?</li>
                        <li>¿Cómo puedo incluir experimentos?</li>
                        <img src="http://localhost:8080/static/images/display.png" className="How-Img" />
                    </ul>
                </div>
                }
                {props.lang === 'English' ? 
                <div className="col-md-4 mt-10">
                    <h2>3. Receive suggestions for your classroom</h2>
                        <img src="http://localhost:8080/static/images/results.png" className="How-Img" />
                </div> : <div className="col-md-4 mt-10">
                    <h2>3. Obtén sugerencias para implementar en tu salón de clases</h2>
                        <img src="http://localhost:8080/static/images/results.png" className="How-Img" />
                </div>
                }
            </div>
        </div>
        </div>

        <div>
            <div className="container-fluid row">
            <div className="col-md-4 text-center">
            <img className="Partners-Img" src="http://localhost:8080/static/images/p18.png"/>
            </div>
            <div className="col-md-4 text-center">
            <img className="Partners-Img-S" src="http://localhost:8080/static/images/inprende.png"/>
            </div>
            <div className="col-md-4 text-center">
            <img className="Partners-Img" src="http://localhost:8080/static/images/spotin.png"/>
            </div>
        </div>
    </div>
    

        
    </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

//Connect component to the controller. 
export default connect(mapStateToProps)(MainPageDisplay);
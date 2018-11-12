import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import ThreeImageList from './ThreeImageList'

/**
 * This is the body of the Main page, which includes general information about Edvo Tech as pseudo-static text. 
 * @param {*} props - Contains default properties and the current language state. 
 */
const MainPageDisplay = (props) => (
    <div>
        {
            //Page Header "Education Evolve"
        }
        {props.lang === 'English' ? 
        <div>
            <h1>EDUCATION EVOLVED</h1>
            <h4>Join the community of educators who are</h4>
            <h4>evolving education</h4>
        </div> : <div>
            <h1>EDUCATION EVOLVED</h1>
            <h4>Únete a la comunidad de educadores</h4>
            <h4>que esta revolucionando la educación</h4>
        </div>
        }

        {
            //Navigation button to Login page.
        }
        <div>
            <NavLink to="/login" activeClassName="is-active" exact={true}>
                <button>{props.lang === 'English' ? 'JOIN' : 'ÚNETE'}</button>
            </NavLink>
        </div>

        {
            //Static text description
        }
        <div>
            <p>EDVO_LOGO_IMG</p>
            {props.lang === 'English' ? 
            <div>
                <h2>We make the process of teaching easier.</h2>
                <h4>By providing the first professional development platform for edcuators,</h4>
                <h4>we enable them to innovate, work efficiently and effectively.</h4>
            </div> : <div>
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
            <div>
                <span>FLOWER_IMG</span>
                {props.lang === 'English' ? 
                <div>
                    <h2>DESIGN</h2>
                    <h5>Collaborating with you to design better learning experiences</h5>
                </div> : <div>
                    <h2>DISEÑO</h2>
                    <h5>Colaborando contigo para diseñar mejores experiencias de aprendizaje.</h5>
                </div>
                }
            </div>

            {
                //Static text description "MANAGEMENT" section
            }
            <div>
                <span>CIRCLE_IMG</span>
                {props.lang === 'English' ? 
                <div>
                    <h2>MANAGEMENT</h2>
                    <h5>Helping you better manage your time.</h5>
                </div> : <div>
                    <h2>MANEJO</h2>
                    <h5>Ayudandote a manejar tu tiempo eficientemente.</h5>
                </div>
                }
            </div>
            
            {
                //Static text description "TOOLS" section
            }
            <div>
                <span>CROSS_IMG</span>
                {props.lang === 'English' ? 
                <div>
                    <h2>TOOLS</h2>
                    <h5>Providing the tools needed to stay up to date with technology.</h5>
                </div> : <div>
                    <h2>HERRAMIENTAS</h2>
                    <h5>Brindandote las herramientas necesarias para que te mantengas al día con la tecnología.</h5>
                </div>
                }
            </div>
            
        </div>

        {
            //"How does it work" section
        }
        <div>
            {props.lang === 'English' ? 
            <div>
                <h1>How does it work?</h1>
            </div> : <div>
                <h1>¿Cómo funciona?</h1>
            </div>
            }
        </div>

        {
            //Steps to join the application 
        }
        <div> 
            <div>
                {props.lang === 'English' ? 
                <div>
                    <h2>1. Fill your profile</h2>
                    <ul>
                        <li>Class size</li>
                        <li>Academic level</li>
                        <li>Subject</li>
                    </ul>
                </div> : <div>
                    <h2>1. Completa tu perfil</h2>
                    <ul>
                        <li>Cantidad de estudiantes</li>
                        <li>Nivel académico</li>
                        <li>Materia</li>
                    </ul>
                </div>
                }
                <span>PERSONS_IMG</span>
            </div>

            <div>
                {props.lang === 'English' ? 
                <div>
                    <h2>2. Tell us your challenges</h2>
                    <ul>
                        <li>How can I increase engagement?</li>
                        <li>How can I include experiments?</li>
                    </ul>
                </div> : <div>
                    <h2>2. Cuéntanos tus retos</h2>
                    <ul>
                        <li>¿Cómo puedo aumentar la participación?</li>
                        <li>¿Cómo puedo incluir experimentos?</li>
                    </ul>
                </div>
                }
                <span>COMPUTER_IMG</span>
            </div>

            <div>
                {props.lang === 'English' ? 
                <div>
                    <h2>3. Receive suggestions for your classroom</h2>
                </div> : <div>
                    <h2>3. Obtén sugerencias para implementar en tu salón de clases</h2>
                </div>
                }
                <span>RESULTS_IMG</span>
            </div>
        </div>

        <div>
            <ThreeImageList/>
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
import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * The Mentor Home page contains two links. One link leads to the Assign Recommendations page and the other, to the Pending Questions page. 
 * @param {*} props - Default properties and current language state
 */
const MentorHome = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="mentor:settings"
    yes={() => (    
    <div className="background-home">
        <div className="container">
            <div className="row">
            {
                //Navigation link to the Assign Recommendations page. 
            }
            <NavLink to="/recommendations/assign" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                
                <div className="col-sm-6 big-card-mentor-home text-center">
                {props.lang === 'English' ? 
                        <div>
                            <h2>Manage</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                            <h2>Recommendations</h2>
                        </div>
                        : 
                        <div>
                            <h2>Manejar</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                            <h2>Recomendaciones</h2>
                        </div>}
                </div>
                
            </NavLink>

            {
                //Navigation link to the Pending Questions page. 
            }
            <NavLink to="/staff/questions" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                <div className="col-sm-6 big-card-mentor-home text-center">
                    {props.lang === 'English' ? 
                        <div>
                            <h2>Answer</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                            <h2>Questions</h2>
                        </div>
                        : 
                        <div>
                            <h2>Contestar</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                            <h2>Preguntas</h2>
                        </div>}
                    </div>   
                
                </NavLink>
            </div>
        </div>
    </div>
                                     )}
                                     no={() => <Redirect to="/" />}
                                   />
);

//Map the current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};

//Connect component to the controller. 
export default connect(mapStateToProps)(MentorHome);
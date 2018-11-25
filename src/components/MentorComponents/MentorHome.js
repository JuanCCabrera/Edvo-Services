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
                    
                    <div className="col-sm-6">
                        <div className="big-card-mentor-home">
                            {props.lang === 'English' ? 
                                <div className="big__mentor__text">
                                    <p>Manage</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                                    <p>Recommendations</p>
                                </div>
                                : 
                                <div className="big__mentor__text">
                                    <p>Manejar</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                                    <p>Recomendaciones</p>
                                </div>
                            }
                        </div>
                    </div>
                    
                </NavLink>

                {
                    //Navigation link to the Pending Questions page. 
                }
                <NavLink to="/staff/questions" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                    <div className="col-sm-6">
                        <div className="big-card-mentor-home">
                            {props.lang === 'English' ? 
                                <div className="big__mentor__text">
                                    <p>Answer</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                                    <p>Questions</p>
                                </div>
                                : 
                                <div className="big__mentor__text">
                                    <p>Contestar</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                                    <p>Preguntas</p>
                                </div>
                            }
                        </div>
                    </div>   
                </NavLink>
            </div>
        </div>
    </div>
                                     )}
                                     no={() => <Redirect to="/login" />}
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
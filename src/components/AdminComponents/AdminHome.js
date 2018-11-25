import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * Generate a home page for Administrators with three links (Administrator Settings, Assign Recommendations, Pending Questions).
 * @param {*} props - Component properties
 */
const AdminHome = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:home"
    yes={() => (    
    <div className="background-home">
        <div className="container">
            <div className="row">
                {
                    //Link to Administrator Settings page
                }
                
                <div className="center-block">
                <div className="col-sm-4">
                    <div className="big-card-admin-home">
                        <NavLink to="/admin/settings/info" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                                {props.lang === 'English' ? 
                                <div className="big__admin__text">
                                    <p>Platform</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-cog"></i></span>
                                    <p>Settings</p>
                                </div>
                                : 
                                <div className="big__admin__text">
                                    <p>Modificar</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-cog"></i></span>
                                    <p>Plataforma</p>
                                </div>}
                        
                        </NavLink>
                    </div>
                    </div>
                </div>
                    {
                        //Link to Assign Recommendations page
                    }
                <div className="col-sm-4">
                    <div className="big-card-admin-home">
                        <NavLink to="/recommendations/assign" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>                
                            {props.lang === 'English' ? 
                                <div className="big__admin__text">
                                    <p>Manage</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                                    <p>Recommendations</p>
                                </div>
                                : 
                                <div className="big__admin__text">
                                    <p>Manejar</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-book"></i></span>
                                    <p>Recomendaciones</p>
                                </div>}
                        </NavLink>
                    </div>
                </div>

                    {
                        //Link to Pending Questions page
                    }
                <div className="col-sm-4">
                    <div className="big-card-admin-home">
                        <NavLink to="/staff/questions" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                            {props.lang === 'English' ? 
                                <div className="big__admin__text">
                                    <p>Answer</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                                    <p>Questions</p>
                                </div>
                                : 
                                <div className="big__admin__text">
                                    <p>Contestar</p>
                                    <span style={{fontSize: '5rem'}}><i className="fas fa-question-circle"></i></span>
                                    <p>Preguntas</p>
                                </div>}                
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
                     )}
                     no={() => <Redirect to="/login" />}
                   />
);

//Map current language state to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
//Connect component to controller
export default connect(mapStateToProps)(AdminHome);
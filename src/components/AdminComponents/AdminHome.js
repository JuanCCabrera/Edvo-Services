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
            <NavLink to="/admin/settings/info" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                <div className="col-xs-12 col-xl-4 big-card-admin-home text-center">
                    
                        {props.lang === 'English' ? 
                        <div>
                            <h2>Platform</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-cog"></i></span>
                            <h2>Settings</h2>
                        </div>
                        : 
                        <div>
                            <h2>Modificar</h2>
                            <span style={{fontSize: '5rem'}}><i className="fas fa-cog"></i></span>
                            <h2>Plataforma</h2>
                        </div>}
                </div>
                
                </NavLink>
                {
                    //Link to Assign Recommendations page
                }
                <NavLink to="/recommendations/assign" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                 
                    <div className="col-xs-12 col-xl-4 big-card-admin-home text-center">
                
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
                    //Link to Pending Questions page
                }
                <NavLink to="/staff/questions" activeClassName="is-active" style={{textDecoration: 'none', color: '#5933AA'}} exact={true}>
                    
                    <div className="col-xs-12 col-xl-4 big-card-admin-home text-center">
               
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

//Map current language state to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
//Connect component to controller
export default connect(mapStateToProps)(AdminHome);
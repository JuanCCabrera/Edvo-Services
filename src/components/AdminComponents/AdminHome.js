import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

/**
 * Generate a home page for Administrators with three links (Administrator Settings, Assign Recommendations, Pending Questions).
 * @param {*} props - Component properties
 */
const AdminHome = (props) => (
    <div>
        <div>
        {
            //Link to Administrator Settings page
        }
        <NavLink to="/admin/settings/info" activeClassName="is-active" exact={true}>
            {props.lang === 'English' ? 
            <div>
                <h2>Platform</h2>
                <span>COG_IMG</span>
                <h2>Settings</h2>
            </div>
            : 
            <div>
                <h2>Modificar</h2>
                <span>COG_IMG</span>
                <h2>Plataforma</h2>
            </div>}
        </NavLink>

        {
            //Link to Assign Recommendations page
        }
        <NavLink to="/recommendations/assign" activeClassName="is-active" exact={true}>
            {props.lang === 'English' ? 
            <div>
                <h2>Manage</h2>
                <span>BOOK_IMG</span>
                <h2>Recommendations</h2>
            </div>
            : 
            <div>
                <h2>Manejar</h2>
                <span>BOOK_IMG</span>
                <h2>Recomendaciones</h2>
            </div>}
        </NavLink>

        {
            //Link to Pending Questions page
        }
        <NavLink to="/staff/questions" activeClassName="is-active" exact={true}>
            {props.lang === 'English' ? 
            <div>
                <h2>Answer</h2>
                <span>QUESTION_MARK_IMG</span>
                <h2>Questions</h2>
            </div>
            : 
            <div>
                <h2>Contestar</h2>
                <span>QUESTION_MARK_IMG</span>
                <h2>Preguntas</h2>
            </div>}
        </NavLink>
            
        </div>
    </div>
);

//Map current language state to component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
//Connect component to controller
export default connect(mapStateToProps)(AdminHome);
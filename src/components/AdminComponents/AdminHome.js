import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const AdminHome = (props) => (
    <div>
        <div>
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

        <NavLink to="/recommendations" activeClassName="is-active" exact={true}>
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

        <NavLink to="/" activeClassName="is-active" exact={true}>
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

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
export default connect(mapStateToProps)(AdminHome);
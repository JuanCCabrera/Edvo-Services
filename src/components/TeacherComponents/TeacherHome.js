import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const TeacherHome = (props) => (
    <div>
        <div>
        <h1>{props.lang === 'English' ? 'Your Dashboard' : 'Su Tablero'}</h1>

        {props.lang === 'English' ? 
        <div>
            <h2>Days in Platform</h2>
        </div>
        : 
        <div>
            <h2>Días en Plataforma</h2>
        </div>}

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

const mapStateToProps = (state) => {
    return {
        teacherMetrics: state.teacherMetrics,
        lang: state.language.lang
    };
};
export default connect(mapStateToProps)(TeacherHome);
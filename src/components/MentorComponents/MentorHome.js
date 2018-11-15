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
    <div>
        {
            //Navigation link to the Assign Recommendations page. 
        }
        <div>
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
            //Navigation link to the Pending Questions page. 
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
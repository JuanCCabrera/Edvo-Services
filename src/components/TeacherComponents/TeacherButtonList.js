import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * The Teacher Button List includes a link to traverse the Teacher Settings page. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherButtonList = (props) => (
    <div>
        <br/>
        {
            //Link to the Basic Information Form
        }
        <Link to={"/teacher/settings/info"}>
            <div className="nav__button">
                <p className="nav__button__text">    
                    {props.lang === 'English' ? 'My Profile' : 'Mi Perfil'}
                </p>
            </div>
        </Link>
        <br/>
        {
            //Link to the Classes page
        }
        <Link to={"/teacher/settings/classes"}>
            <div className="nav__button">
                <p className="nav__button__text"> 
                    {props.lang === 'English' ? 'Classes' : 'Cursos'}
                </p>
            </div>
        </Link>
        <br/>
        {
            //Link to the Plan page
        }
        <Link to={"/teacher/settings/plans"}>
            <div className="nav__button">
                <p className="nav__button__text"> 
                    Plan
                </p>
            </div>
        </Link>
    </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherButtonList);
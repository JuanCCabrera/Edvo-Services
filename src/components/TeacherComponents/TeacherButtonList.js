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
        <Link to={"/teacher/settings/info"}>{props.lang === 'English' ? 'Account Information' : 'Información de Cuenta'}</Link>
        <br/>
        {
            //Link to the Classes page
        }
        <Link to={"/teacher/settings/classes"}>{props.lang === 'English' ? 'Classes' : 'Clases'}</Link>
        <br/>
        {
            //Link to the Plan page
        }
        <Link to={"/teacher/settings/plans"}>Plan</Link>
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
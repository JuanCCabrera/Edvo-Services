import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const TeacherButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/teacher/settings/info"}>{props.lang === 'English' ? 'Account Information' : 'Información de Cuenta'}</Link>
        <br/>
        <Link to={"/teacher/settings/classes"}>{props.lang === 'English' ? 'Classes' : 'Clases'}</Link>
        <br/>
        <Link to={"/teacher/settings/plans"}>Plan</Link>
    </div>
);

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherButtonList);
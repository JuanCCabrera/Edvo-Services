import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const AdminButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/admin/settings/info"}>{props.lang === 'English' ? 'Account Information' : 'Información de Cuenta'}</Link>
        <br/>
        <Link to={"/admin/settings/users"}>{props.lang === 'English' ? 'Users' : 'Usuarios'}</Link>
        <br/>
        <Link to={"/admin/settings/schools"}>{props.lang === 'English' ? 'Institutions' : 'Instituciones'}</Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
}
export default connect(mapStateToProps)(AdminButtonList);
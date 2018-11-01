import React from 'react';
import AdminButtonList from './AdminButtonList';
import SchoolList from '../SchoolList';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const AppSchools = (props) => (
    <div>
        <AdminButtonList/>
        <Link to='/admin/settings/schools/add'><button>{props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'}</button></Link>
        <SchoolList/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(AppSchools);
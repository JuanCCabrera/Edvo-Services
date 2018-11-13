import React from 'react';
import AdminButtonList from './AdminButtonList';
import SchoolList from '../SchoolList';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import InstitutionFilters from '../Filters/InstitutionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

const AppSchools = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:settings"
    yes={() => (
    <div>
        <AdminButtonList/>
        <Link to='/admin/settings/schools/add'><button>{props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'}</button></Link>
        <InstitutionFilters/>
        <SchoolList/>
    </div>
                                         )}
                                         no={() => <Redirect to="/" />}
                                       />
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(AppSchools);
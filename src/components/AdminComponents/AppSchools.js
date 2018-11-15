import React from 'react';
import AdminButtonList from './AdminButtonList';
import SchoolList from '../SchoolList';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import InstitutionFilters from '../Filters/InstitutionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * Generates template showing the list of all schools in the system, a filtering component to select specific schools, 
 * a list of links to traverse other pages within the administrator settings page, and a link to the create institutions page. 
 * @param {*} props - Component properties
 */
const AppSchools = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:settings"
    yes={() => (
    <div>
    {
        //Links to traverse Administrator Settings
    }
        <AdminButtonList/>
    {
        //Link to Create Insitutions page
    }
        <Link to='/admin/settings/schools/add'><button>{props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'}</button></Link>
    {
        //Institution filters
    }
        <InstitutionFilters/>
    {
        //List of all institutions(schools) registered in the system
    }
        <SchoolList/>
    </div>
                                         )}
                                         no={() => <Redirect to="/" />}
                                       />
);

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to controller. 
export default connect(mapStateToProps)(AppSchools);
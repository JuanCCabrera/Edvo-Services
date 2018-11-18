import React from 'react';
import AdminButtonList from './AdminButtonList';
import SchoolList from '../SchoolList';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import InstitutionFilters from '../Filters/InstitutionFilters';

/**
 * Generates template showing the list of all schools in the system, a filtering component to select specific schools, 
 * a list of links to traverse other pages within the administrator settings page, and a link to the create institutions page. 
 * @param {*} props - Component properties
 */
const AppSchools = (props) => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-2">
                    <div className="text-center well">
                    {
                        //Links to traverse Administrator Settings
                    }
                        <AdminButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                    
                    {
                        //Page title
                    }
                    <div className="text-center pending__title__2">
                        <p>{props.lang === 'English' ? 'Institutions' : 'Instituciones'}</p>
                        <hr className="break"/>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                {
                                    //Institution filters
                                }
                                    <InstitutionFilters/>
                            </div>
                            <div className="col-sm-6">
                                {
                                    //Link to Create Insitition page
                                }
                                    <Link to='/admin/settings/schools/add'>
                                        <button className="btn btn-item">
                                            {props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'} 
                                            <span style={{marginLeft: '1rem'}}>
                                                <i className="fas fa-building"></i>
                                            </span>
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                    
                        {
                            //List of all institutions(schools) registered in the system
                        }
                            <SchoolList/>
                </div>
            </div>
        </div>
    </div>
);

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to controller. 
export default connect(mapStateToProps)(AppSchools);
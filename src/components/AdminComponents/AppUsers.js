import React from 'react';
import AdminButtonList from './AdminButtonList';
import UserList from '../UserList';
import {Link} from 'react-router-dom';
import UserFilters from '../Filters/UserFilters';
import {connect} from 'react-redux';

/**
 * Generates template showing the list of all users in the system, a filtering component to specifically find certain users, a link to the Create User page, 
 * and a list of links to traverse the Administrator Settings page. 
 * @param {*} props - Component default properties
 */
 const AppUsers = (props) => (
        <div className="background-home">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="text-center well">
                        {
                            //Links to traverse Administrator Settings page
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
                            <p>{props.lang === 'English' ? 'Users' : 'Usuarios'}</p>
                            <hr className="break"/>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    {
                                        //User filters
                                    }
                                        <UserFilters/>
                                </div>
                                <div className="col-sm-6">
                                    {
                                        //Link to Create User page
                                    }
                                    <Link to='/admin/settings/users/add'>
                                        <button className="btn btn-item">
                                            {props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'} 
                                            <span style={{marginLeft: '1rem'}}>
                                                <i className="fas fa-user-plus"></i>
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {
                            //List of all users in the system
                        }
                            <UserList/>
                    </div>
                </div>
            </div>
        </div>
 );

 const mapStateToProps = (state) => {
     return {
         lang: state.language.lang
     }
 }

 export default connect(mapStateToProps)(AppUsers);
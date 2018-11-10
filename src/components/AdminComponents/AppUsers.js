import React from 'react';
import AdminButtonList from './AdminButtonList';
import UserList from '../UserList';
import {Link} from 'react-router-dom';
import UserFilters from '../Filters/UserFilters';

/**
 * Generates template showing the list of all users in the system, a filtering component to specifically find certain users, a link to the Create User page, 
 * and a list of links to traverse the Administrator Settings page. 
 * @param {*} props - Component default properties
 */
 const AppUsers = (props) => (
        <div>
        {
            //Links to traverse Administrator Settings page
        }
            <AdminButtonList/>
        {
            //Link to Create User page
        }
            <Link to='/admin/settings/users/add'><button>{props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'}</button></Link>
        {
            //User filters
        }
            <UserFilters/>
        {
            //List of all users in the system
        }
            <UserList/>
        </div>
 );

 export default AppUsers;
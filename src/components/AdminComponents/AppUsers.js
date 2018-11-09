import React from 'react';
import AdminButtonList from './AdminButtonList';
import UserList from '../UserList';
import {Link} from 'react-router-dom';
import UserFilters from '../Filters/UserFilters';

 const AppUsers = (props) => (
        <div>
            <AdminButtonList/>
            <Link to='/admin/settings/users/add'><button>{props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'}</button></Link>
            <UserFilters/>
            <UserList/>
        </div>
 );

 export default AppUsers;
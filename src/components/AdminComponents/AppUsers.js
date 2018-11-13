import React from 'react';
import AdminButtonList from './AdminButtonList';
import UserList from '../UserList';
import {Link, Redirect} from 'react-router-dom';
import UserFilters from '../Filters/UserFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

 const AppUsers = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:settings"
    yes={() => (
        <div>
            <AdminButtonList/>
            <Link to='/admin/settings/users/add'><button>{props.lang === 'English' ? 'Create New User' : 'Crear Nuevo Usuario'}</button></Link>
            <UserFilters/>
            <UserList/>
        </div>
                                     )}
                                     no={() => <Redirect to="/" />}
                                   />
 );

 export default AppUsers;
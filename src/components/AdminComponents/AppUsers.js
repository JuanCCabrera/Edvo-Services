import React from 'react';
import AdminButtonList from './AdminButtonList';
import UserList from '../UserList';
import {Link} from 'react-router-dom';

 const AppUsers = (props) => (
        <div>
            <AdminButtonList/>
            <Link to='/admin/settings/users/add'><button>Create New User</button></Link>
            <UserList/>
        </div>
 );

 export default AppUsers;
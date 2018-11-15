import React from 'react';
import AdminButtonList from './AdminButtonList';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import {Redirect} from 'react-router-dom';
import Can from '../../Can';
import auth0Client from '../../Auth';
/**
 * Layout for Administrator Profile page.  
 */
 const AdminProfile = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:settings"
    yes={() => (
        <div>
            <AdminButtonList/>
            <BasicInfoProfileForm/>
        </div>
                             )}
                             no={() => <Redirect to="/" />}
                           />
 );

 export default AdminProfile;
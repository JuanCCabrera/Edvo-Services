import React from 'react';
import AdminButtonList from './AdminButtonList';
import BasicInfoProfileForm from '../BasicInfoProfileForm';

/**
 * Layout for Administrator Profile page.  
 */
 const AdminProfile = () => (
        <div>
            <AdminButtonList/>
            <BasicInfoProfileForm/>
        </div>
 );

 export default AdminProfile;
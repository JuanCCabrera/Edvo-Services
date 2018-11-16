import React from 'react';
import AdminButtonList from './AdminButtonList';
import BasicInfoProfileForm from '../BasicInfoProfileForm';

/**
 * Layout for Administrator Profile page.  
 */
 const AdminProfile = () => (
        <div className="background-home">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 text-center well">
                        <AdminButtonList/>
                    </div>
                    <div className="col-sm-1"/>
                    <div className="big-card col-sm-9">
                        <BasicInfoProfileForm/>
                    </div>
                </div>
            </div>
        </div>
 );

 export default AdminProfile;
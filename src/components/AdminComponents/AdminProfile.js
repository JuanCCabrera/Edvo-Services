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
        
        <div className="background-home">
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="text-center well">
                        <AdminButtonList/>
                        </div>
                    </div>
                    <div className="col-sm-1"/>
                    <div className="col-sm-9">
                        <div className="big-card">
                            <BasicInfoProfileForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                             )}
                             no={() => <Redirect to="/login" />}
                           />
 );

 export default AdminProfile;
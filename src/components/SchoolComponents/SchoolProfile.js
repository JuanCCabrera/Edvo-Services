import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * School profile page. 
 */
 const SchoolProfile = (props) => (
     //Authenticate user information to grant access to the School Profile page 
    <Can
    role={auth0Client.getRole()}
    perform="school:settings"
    yes={() => (
        <div className="background-home">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"/>
                    {
                        //Profile information form
                    }
                        <div className="col-sm-6" style={{marginBottom: '2.7rem'}}>
                            <div className="big-card">
                                <BasicInfoProfileForm/>
                            </div>
                        </div>
                    <div className="col-sm-3"/>
                </div>
            </div>
        </div>
                 )}
                 //Redirect user to login page if not authorized. 
                 no={() => <Redirect to="/login" />}
               />
 );

 export default SchoolProfile;
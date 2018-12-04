import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * Mentor profile page layout. 
 * @param {*} props - Default properties 
 */
 const MentorProfile = (props) => (
     //Authenticate user information to grant access to Mentor Profile page. 
    <Can
    role={auth0Client.getRole()}
    perform="mentor:settings"
    yes={() => (
     <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-3"/>
                    <div className="col-sm-6" style={{marginBottom: '2.7rem'}}>
                    {
                        //Profile information form. 
                    }
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

 export default MentorProfile;
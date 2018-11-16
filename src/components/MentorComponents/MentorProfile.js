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
    <Can
    role={auth0Client.getRole()}
    perform="mentor:settings"
    yes={() => (
        <div className="container">
            <div className="row">
                <div className="col-sm-4"/>
                <div className="big-card col-sm-4" style={{marginBottom: '2.7rem'}}>
                    <BasicInfoProfileForm/>
                </div>
                <div className="col-sm-4"/>
            </div>
        </div>
                                 )}
                                 no={() => <Redirect to="/" />}
                               />
 );

 export default MentorProfile;
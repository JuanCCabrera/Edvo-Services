import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

 const MentorProfile = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="mentor:settings"
    yes={() => (
        <div>
            <MentorButtonList/>
            <BasicInfoProfileForm/>
        </div>
                                 )}
                                 no={() => <Redirect to="/" />}
                               />
 );

 export default MentorProfile;
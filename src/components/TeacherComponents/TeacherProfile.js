import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import TeacherButtonList from './TeacherButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * Teacher Settings (Profile) page layout.  
 * @param {*} props - Default properties
 */
 const TeacherProfile = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:settings"
    yes={() => (
        <div>
            <TeacherButtonList/>
            <BasicInfoProfileForm {...props}/>
        </div>
                 )}
                 no={() => <Redirect to="/" />}
               />
 );

 export default TeacherProfile;
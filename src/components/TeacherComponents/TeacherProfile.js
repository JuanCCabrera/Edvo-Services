import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import TeacherButtonList from './TeacherButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

 const TeacherProfile = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:settings"
    yes={() => (
        <div>
            <TeacherButtonList/>
            <BasicInfoProfileForm/>
        </div>
                 )}
                 no={() => <Redirect to="/" />}
               />
 );

 export default TeacherProfile;
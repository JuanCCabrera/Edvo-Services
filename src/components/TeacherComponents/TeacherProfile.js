import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import TeacherButtonList from './TeacherButtonList';

/**
 * Teacher Settings (Profile) page layout.  
 * @param {*} props - Default properties
 */
 const TeacherProfile = (props) => (
        <div>
            <TeacherButtonList/>
            <BasicInfoProfileForm/>
        </div>
 );

 export default TeacherProfile;
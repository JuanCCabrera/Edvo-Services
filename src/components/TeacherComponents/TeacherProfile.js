import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import TeacherButtonList from './TeacherButtonList';

 const TeacherProfile = (props) => (
        <div>
            <TeacherButtonList/>
            <BasicInfoProfileForm/>
        </div>
 );

 export default TeacherProfile;
import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';

 const MentorProfile = (props) => (
        <div>
            <MentorButtonList/>
            <BasicInfoProfileForm/>
        </div>
 );

 export default MentorProfile;
import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';

/**
 * Mentor profile page layout. 
 * @param {*} props - Default properties 
 */
 const MentorProfile = (props) => (
        <div>
            <MentorButtonList/>
            <BasicInfoProfileForm/>
        </div>
 );

 export default MentorProfile;
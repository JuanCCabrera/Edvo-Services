import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';

/**
 * Mentor profile page layout. 
 * @param {*} props - Default properties 
 */
 const MentorProfile = (props) => (
        <div className="container">
            <div className="row">
                <div className="col-sm-4"/>
                <div className="big-card col-sm-4" style={{marginBottom: '2.7rem'}}>
                    <BasicInfoProfileForm/>
                </div>
                <div className="col-sm-4"/>
            </div>
        </div>
 );

 export default MentorProfile;
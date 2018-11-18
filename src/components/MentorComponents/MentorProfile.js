import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import MentorButtonList from './MentorButtonList';

/**
 * Mentor profile page layout. 
 * @param {*} props - Default properties 
 */
 const MentorProfile = (props) => (
     <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-3"/>
                    <div className="col-sm-6" style={{marginBottom: '2.7rem'}}>
                        <div className="big-card">
                            <BasicInfoProfileForm/>
                        </div>
                    </div>
                <div className="col-sm-3"/>
            </div>
        </div>
    </div>
 );

 export default MentorProfile;
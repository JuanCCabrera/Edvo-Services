import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import TeacherButtonList from './TeacherButtonList';

/**
 * Teacher Settings (Profile) page layout.  
 * @param {*} props - Default properties
 */
 const TeacherProfile = (props) => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-2 text-center well">
                    <TeacherButtonList/>
                </div>
                <div className="col-sm-1"/>
                <div className="big-card col-sm-9">
                    <BasicInfoProfileForm/>
                </div>
            </div>
        </div>
    </div>
 );

 export default TeacherProfile;
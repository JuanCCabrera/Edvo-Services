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
                 )}
                 no={() => <Redirect to="/" />}
               />

 );

 export default TeacherProfile;
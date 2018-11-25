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
                <div className="col-sm-2">
                    <div className="text-center well">
                      <TeacherButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                    <div className="big-card">
                        <BasicInfoProfileForm/>
                    </div>
                </div>
            </div>
        </div>
    </div>
                 )}
                 no={() => <Redirect to="/login" />}
               />

 );

 export default TeacherProfile;
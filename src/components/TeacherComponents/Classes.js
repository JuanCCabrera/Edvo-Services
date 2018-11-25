import React from 'react';
import TeacherButtonList from './TeacherButtonList';
import ClassList from './ClassList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * Classes page layout. 
 * @param {*} props - Default properties
 */
const Classes = (props) => (
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
                        <ClassList/>
                    </div>
                </div>
            </div>
        </div>
    </div>
                 )}
                 no={() => <Redirect to="/login" />}
               />    

);

export default Classes;
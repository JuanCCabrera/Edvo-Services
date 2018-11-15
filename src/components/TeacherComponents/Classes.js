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
    <div>
        <TeacherButtonList/>
        <ClassList/>
    </div>
                 )}
                 no={() => <Redirect to="/" />}
               />    
);

export default Classes;
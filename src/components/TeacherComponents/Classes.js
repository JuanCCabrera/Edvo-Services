import React from 'react';
import TeacherButtonList from './TeacherButtonList';
import ClassList from './ClassList';

/**
 * Classes page layout. 
 * @param {*} props - Default properties
 */
const Classes = (props) => (
    <div>
        <TeacherButtonList/>
        <ClassList/>
    </div>);

export default Classes;
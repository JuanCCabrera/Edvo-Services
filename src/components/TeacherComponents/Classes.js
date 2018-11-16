import React from 'react';
import TeacherButtonList from './TeacherButtonList';
import ClassList from './ClassList';

/**
 * Classes page layout. 
 * @param {*} props - Default properties
 */
const Classes = (props) => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-2 text-center well">
                    <TeacherButtonList/>
                </div>
                <div className="col-sm-1"/>
                <div className="big-card col-sm-9">
                    <ClassList/>
                </div>
            </div>
        </div>
    </div>
);

export default Classes;
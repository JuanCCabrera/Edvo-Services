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
);

export default Classes;
import React from 'react';
import {Link} from 'react-router-dom';

const TeacherButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/teacher/settings/info"}>Account Information</Link>
        <br/>
        <Link to={"/teacher/settings/classes"}>Classes</Link>
        <br/>
        <Link to={"/teacher/settings/plans"}>Plan</Link>
    </div>
);

export default TeacherButtonList;
import React from 'react';
import {Link} from 'react-router-dom';

const MentorButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/mentor/settings/info"}>Account Information</Link>
    </div>
);

export default MentorButtonList;
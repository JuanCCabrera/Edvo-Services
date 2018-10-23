import React from 'react';
import {Link} from 'react-router-dom';

const AdminButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/admin/settings/info"}>Account Information</Link>
        <br/>
        <Link to={"/admin/settings/users"}>Users</Link>
        <br/>
        <Link to={"/admin/settings/schools"}>Institutions</Link>
    </div>
);

export default AdminButtonList;
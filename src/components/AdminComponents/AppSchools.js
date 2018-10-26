import React from 'react';
import AdminButtonList from './AdminButtonList';
import SchoolList from '../SchoolList';
import {Link} from 'react-router-dom';

const AppSchools = (props) => (
    <div>
        <AdminButtonList/>
        <Link to='/admin/settings/schools/add'><button>Create New Institution</button></Link>
        <SchoolList/>
    </div>
);

export default AppSchools;
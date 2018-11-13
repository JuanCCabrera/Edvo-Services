import React from 'react';
import BasicInfoProfileForm from '../BasicInfoProfileForm';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

 const SchoolProfile = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="school:settings"
    yes={() => (
        <div>
            <BasicInfoProfileForm {...props}/>
        </div>
                 )}
                 no={() => <Redirect to="/" />}
               />
 );

 export default SchoolProfile;
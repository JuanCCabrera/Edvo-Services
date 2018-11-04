import React from 'react';
import RegistrationForm from './RegistrationForm';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';

const Registration = (props) => (
    <div>
        <RegistrationForm/>

        <ContactForm/>
    </div>
);


export default Registration;
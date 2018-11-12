import React from 'react';
import RegistrationForm from './RegistrationForm';
import ContactForm from './ContactForm';

/**
 * Registration page layout
 * @param {*} props - Default properties
 */
const Registration = (props) => (
    <div>
        <RegistrationForm/>

        <ContactForm/>
    </div>
);


export default Registration;
import React from 'react';
import RegistrationForm from './RegistrationForm';
import ContactForm from './ContactForm';

/**
 * Registration page layout
 * @param {*} props - Default properties
 */
const Registration = (props) => (
    <div>
        <div className="background-home">
            <RegistrationForm/>
        </div>
        <div>
            <ContactForm/>
        </div>
    </div>
);


export default Registration;
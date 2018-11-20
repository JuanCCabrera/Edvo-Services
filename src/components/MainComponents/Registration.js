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
            <div className="container">
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8">
                        <RegistrationForm/>
                    </div>
                    <div className="col-sm-2"/>
                </div>
            </div>
        </div>
        <div>
            <ContactForm/>
        </div>
    </div>
);


export default Registration;
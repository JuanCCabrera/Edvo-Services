import React from 'react';
import RegistrationForm from './RegistrationForm';
import ContactForm from './ContactForm';
import {connect} from 'react-redux';
import { sendRegistration } from '../../actions/registration';

const Registration = (props) => (
    <div>
        <RegistrationForm onSubmit={(registration_info) => {
            props.dispatch(sendRegistration(registration_info));
            }}/>
        <ContactForm/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        email: state.email,
        password: state.password
    }
} 

export default connect(mapStateToProps)(Registration);
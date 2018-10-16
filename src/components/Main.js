import React from 'react';
import {connect} from 'react-redux';
import MainPageDisplay from './MainPageDisplay';
import ContactForm from './ContactForm';
import {sendContactForm} from '../actions/contact';

const MainPage = (props) => (
    <div>
        <MainPageDisplay/>
        <div>
            <ContactForm
            onSubmit={(contact) => {
                props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
);

export default connect()(MainPage);
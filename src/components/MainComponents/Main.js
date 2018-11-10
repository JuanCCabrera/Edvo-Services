import React from 'react';
import {connect} from 'react-redux';
import MainPageDisplay from './MainPageDisplay';
import ContactForm from './ContactForm';
import {sendContactForm} from '../../actions/contact';

/**
 * Main page layout.
 * @param {*} props - Default component properties
 */
const MainPage = (props) => (
    <div>
        {
            //Main page body
        }
        <MainPageDisplay/>
        {
            //Contact form
        }
        <div>
            <ContactForm
            onSubmit={(contact) => {
                props.dispatch(sendContactForm(contact));
            }}/>
        </div>
    </div>
);

//Connect component to controller. 
export default connect()(MainPage);
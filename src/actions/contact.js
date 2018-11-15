//Contact Action Generators

/**
 * sendContactForm - Generates an object consisting of the name, email and message created by any type of user through the Contact Form. 
 * @param {*} param0 - Object containing the name, email and message entered by a user to request assistance from the Edvo Tech staff. This information is entered in the Contact Form. 
 */
export const sendContactForm = (
    {
        name = '',
        email = '',
        message = ''
    } = {}) => {
    return {
    type: 'SEND_CONTACT_FORM',
        contact: {
            name: name,
            email: email,
            message: message
        }
    }
};
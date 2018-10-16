//Contact Action Generators

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
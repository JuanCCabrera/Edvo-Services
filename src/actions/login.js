//Login Action Generators

/**
 * sendLogin - Generates and object containing a user's email and password. 
 * @param {*} param0 - Object containing a user's email and password
 */
export const sendLogin = (
    {
        email = '',
        password = ''
    } = {}) => {
    return {
    type: 'SEND_LOGIN_FORM',
        login: {
            email: email,
            password: password
        }
    }
};
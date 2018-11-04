//Login Action Generators

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
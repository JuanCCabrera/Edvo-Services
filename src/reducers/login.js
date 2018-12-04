
//Kept as legacy code in case Auth0 service removes support. *********

//Reducer default state
const loginReducerDefaultState = {
    login: {
        email: '',
        password: ''
    }
};

/**
 * loginReducer - Receives and logs user login information
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const loginReducer = (state = loginReducerDefaultState, action) => {
    switch (action.type) {
        //Store user login information. 
        case 'SEND_LOGIN_FORM':
            return {...action.login};
        default:
            return state;
    };
}

export default loginReducer;


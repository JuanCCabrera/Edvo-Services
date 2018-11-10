
//Kept as legacy code in case Auth0 service removes support. 

//Reducer default state
const loginReducerDefaultState = {
    login: {
        email: '',
        password: ''
    }
};

const loginReducer = (state = loginReducerDefaultState, action) => {
    switch (action.type) {
        case 'SEND_LOGIN_FORM':
            return {...action.login};
        default:
            return state;
    };
}

export default loginReducer;


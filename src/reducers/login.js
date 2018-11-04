const loginReducerDefaultState = {
    login: {
        email: '',
        password: ''
    }
};

const loginReducer = (state = loginReducerDefaultState, action) => {
    switch (action.type) {
        case 'SEND_LOGIN_FORM':
            //TO-DO: SEND EMAIL
            return {...action.login};
        default:
            return state;
    };
}

export default loginReducer;


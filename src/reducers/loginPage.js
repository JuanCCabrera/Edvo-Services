
//Login Page Reducer

//Reducer default state
const loginPageReducerDefaultState = {
    login: {
        registered: false,
        hasPaidSubscription: false
    }
};

const loginPageReducer = (state = loginPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOG_REGISTRATION_STATUS':
            return {...state.login, registered: action.registered};
        case 'LOG_SUBSCRIPTION_STATUS':
            return {...state.login, hasPaidSubscription: action.hasPaidSubscription};
        default:
            return {state};
    };
}

export default loginPageReducer;


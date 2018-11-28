
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
            return {...state, registered: action.registered};
        case 'LOG_SUBSCRIPTION_STATUS':
            return {...state, hasPaidSubscription: action.hasPaidSubscription};
        default:
            return {...state};
    };
}

export default loginPageReducer;


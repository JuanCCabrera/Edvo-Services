
//Login Page Reducer

//Reducer default state
const loginPageReducerDefaultState = {
    login: {
        registered: false,
        hasPaidSubscription: false
    }
};

/**
 * loginPageReducer - Receives and logs information about the user's registration and subscription status. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const loginPageReducer = (state = loginPageReducerDefaultState, action) => {
    switch (action.type) {
        //Set user registration status to true (registered) or false (not registered). 
        case 'LOG_REGISTRATION_STATUS':
            return {...state, registered: action.registered};
        //Set user subscription status to true (active subscription) or false (not active). 
        case 'LOG_SUBSCRIPTION_STATUS':
            return {...state, hasPaidSubscription: action.hasPaidSubscription};
        default:
            return {...state};
    };
}

export default loginPageReducer;


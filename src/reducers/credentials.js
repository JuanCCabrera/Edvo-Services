//Reducer default state
const credentialsReducerDefaultState = {
    credentials: {
        isAuthenticated: false,
        role: null,
    }
};

/**
 * credentialsReducer - Receives and logs user login information to modify the navigation header. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const credentialsReducer = (state = credentialsReducerDefaultState, action) => {
    switch (action.type) {
        //Logs asked question
        case 'SET_AUTHENTICATION':
            return {...state.credentials, isAuthenticated: action.isAuthenticated};
        //Returns existing state by default
        case 'SET_ROLE':
            return {...state.credentials, role: action.role};
        default:
            return {state};
    };
}

export default credentialsReducer;


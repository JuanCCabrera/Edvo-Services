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
            return {...state, isAuthenticated: action.isAuthenticated};
        //Returns existing state by default
        case 'SET_ROLE':
            return {...state, role: action.role};
        default:
            return {...state};
    };
}

export default credentialsReducer;


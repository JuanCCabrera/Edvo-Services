//Reducer default state
const userReducerDefaultState = [];

/**
 * userReducer - Receives and logs information relating to users which are displayed in the AppUsers and Assign Recommendations pages. 
 * @param {*} state - Reducer state 
 * @param {*} action - Action received from dispatcher
 */
const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        //Log user information to add to the AppUsers and Assign Recommendations pages. 
        case 'ADD_USER':
            //Add new user to user list
            return [...state, action.user];
        //Remove user from the AppUsers and Assign Recommendations pages. 
        case 'REMOVE_USER':
            return state.filter(({id}) => id !== action.id);
        //Return existing state by default
        default:
            return [...state];
    };
}

export default userReducer;

//User Object Model
/*
user: {
        id: '',
        name: '',
        lastName: '',
        email: '',
        weeklyReco : false,
        categories: []
    }
*/


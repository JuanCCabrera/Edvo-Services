//Reducer default state
const schoolReducerDefaultState = [];

/**
 * schoolReducer - Receives and logs information to display in the AppSchools page. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const schoolReducer = (state = schoolReducerDefaultState, action) => {
    switch (action.type) {
        //Log school to display in the AppSchools page
        case 'ADD_SCHOOL':
            return [...state, action.school];
        //Remove school from the school list. 
        case 'REMOVE_SCHOOL':
            return state.filter(({id}) => id !== action.id);
        case 'UNLOAD_INSTITUTIONS':
            return [];
        //Return existing state by default
        default:
            return [...state];
    };
}

export default schoolReducer;

/*
School Object Model 

school: {
        id: '',
        name: '',
        location: '',
        type : '',
        numAccounts: 0
    }
*/


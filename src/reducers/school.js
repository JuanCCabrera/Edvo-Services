const schoolReducerDefaultState = [];

const schoolReducer = (state = schoolReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SCHOOL':
            //Add new user to user list
            return [...state, action.school];
        case 'REMOVE_SCHOOL':
            return state.filter(({id}) => id !== action.id);
        default:
            return [...state];
    };
}

export default schoolReducer;

/*
school: {
        id: '',
        name: '',
        location: '',
        type : '',
        numAccounts: 0
    }
*/


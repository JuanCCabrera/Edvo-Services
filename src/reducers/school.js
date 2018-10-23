const schoolReducerDefaultState = [];

const schoolReducer = (state = schoolReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SCHOOL':
            //Add new user to user list
            return [...state, action.user];
        case 'REMOVE_SCHOOL':
            return state.filter(({id}) => id !== action.id);
        default:
            return [...state];
    };
}

export default userReducer;

/*
users: {
        id: '',
        name: '',
        email: '',
        weeklyReco : false,
        categories: []
    }
*/


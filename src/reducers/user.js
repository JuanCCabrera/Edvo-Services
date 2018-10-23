const userReducerDefaultState = [];

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            //Add new user to user list
            return [...state, action.user];
        case 'REMOVE_USER':
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
        lastName: '',
        weeklyReco : false,
        categories: []
    }
*/


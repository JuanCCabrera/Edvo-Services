const schoolReducerDefaultState = [];

const schoolReducer = (state = schoolReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SCHOOL':            
            console.log("IM IN");
            return [...state, action.school];
        case 'REMOVE_SCHOOL':
            return state.filter(({id}) => id !== action.id);
        default:
            return [...state];
    };
}

export default schoolReducer;
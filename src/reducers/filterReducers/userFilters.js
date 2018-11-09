const userFiltersReducerDefaultState = {
    text: '',
    checkType: 'all',
};

const userFiltersReducer = (state = userFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_USER_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SET_WEEKLY_RECOMMENDATION_CHECK':
            return{
                ...state,
                checkType: action.checkType
            }
        default:
            return state;
    }
}

export default userFiltersReducer;
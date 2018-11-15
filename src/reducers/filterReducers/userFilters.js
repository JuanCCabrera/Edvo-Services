//Reducer default state
const userFiltersReducerDefaultState = {
    text: '',
    checkType: 'all',
};

/**
 * userFiltersReducer - Modifies user filter state to change the data returned by the user selector. 
 * @param {*} state - Filter state 
 * @param {*} action - Action received from dispatcher
 */
const userFiltersReducer = (state = userFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_USER_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        //Set weekly recommendation received status (all, has received a weekly recommendation, has not received a weekly recommendation)
        case 'SET_WEEKLY_RECOMMENDATION_CHECK':
            return{
                ...state,
                checkType: action.checkType
            }
        //Return existing state by default
        default:
            return state;
    }
}

export default userFiltersReducer;
//Reducer default state
const recommendationsFiltersReducerDefaultState = {
    text: '',
    category: 'all',
};

/**
 * recommendationsFiltersReducer - Modifies the recommendations filter state to change the data returned by the recommendations selector. 
 * @param {*} state -  Filter state
 * @param {*} action - Action received from dispatcher
 */
const recommendationsFiltersReducer = (state = recommendationsFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_RECOMMENDATIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        //Set category filter
        case 'SET_RECOMMENDATIONS_CATEGORY_FILTER':
            return{
                ...state,
                category: action.category
            }
        //Return existing state by default
        default:
            return state;
    }
}

export default recommendationsFiltersReducer;
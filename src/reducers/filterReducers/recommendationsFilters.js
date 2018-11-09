const recommendationsFiltersReducerDefaultState = {
    text: '',
    category: 'all',
};

const recommendationsFiltersReducer = (state = recommendationsFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_RECOMMENDATIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SET_RECOMMENDATIONS_CATEGORY_FILTER':
            return{
                ...state,
                category: action.category
            }
        default:
            return state;
    }
}

export default recommendationsFiltersReducer;
//Reducer default state
const teacherRecommendationsFiltersReducerDefaultState = {
    text: '',
    checkType: 'date',
    read: 'all'
};

/**
 * teacherRecommendationsFiltersReducer - Modifies the teacher recommendations filter state to change the data returned by the teacher recommendations selector. 
 * @param {*} state - Filter state
 * @param {*} action - Action received from dispatcher
 */
const teacherRecommendationsFiltersReducer = (state = teacherRecommendationsFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_TEACHER_RECOMMENDATIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        //Set sorting filter (by date or rating)
        case 'SET_TEACHER_RECOMMENDATIONS_SORTING_FILTER':
            return{
                ...state,
                checkType: action.checkType
            }
        //Set read status filter (all, read, or not read)
        case 'SET_TEACHER_RECOMMENDATIONS_READ_FILTER':
            return{
                ...state,
                read: action.read
            }
        //Return existing state by default
        default:
            return state;
    }
}

export default teacherRecommendationsFiltersReducer;
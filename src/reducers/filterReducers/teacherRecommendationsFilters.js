const teacherRecommendationsFiltersReducerDefaultState = {
    text: '',
    checkType: 'date',
    read: 'all'
};

const teacherRecommendationsFiltersReducer = (state = teacherRecommendationsFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEACHER_RECOMMENDATIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SET_TEACHER_RECOMMENDATIONS_SORTING_FILTER':
            return{
                ...state,
                checkType: action.checkType
            }
        case 'SET_TEACHER_RECOMMENDATIONS_READ_FILTER':
            return{
                ...state,
                read: action.read
            }
        default:
            return state;
    }
}

export default teacherRecommendationsFiltersReducer;
const teacherQuestionsFiltersReducerDefaultState = {
    text: '',
    checkType: 'date',
};

const teacherQuestionsFiltersReducer = (state = teacherQuestionsFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEACHER_QUESTIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SET_TEACHER_QUESTIONS_SORTING':
            return{
                ...state,
                checkType: action.checkType
            }
        default:
            return state;
    }
}

export default teacherQuestionsFiltersReducer;
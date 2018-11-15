//Reducer default state
const teacherQuestionsFiltersReducerDefaultState = {
    text: '',
    checkType: 'date',
    read: 'all'
};

/**
 * teacherQuestionsFiltersReducer - Modifies the teacher questions filter state to change the data returned by the teacher questions selector. 
 * @param {*} state - Filter state
 * @param {*} action - Action received from dispatcher
 */
const teacherQuestionsFiltersReducer = (state = teacherQuestionsFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_TEACHER_QUESTIONS_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        //Set sorting order (by date or by rating)
        case 'SET_TEACHER_QUESTIONS_SORTING':
            return{
                ...state,
                checkType: action.checkType
            }
        //Set read status (all, read or not read)
        case 'SET_TEACHER_QUESTIONS_READ_FILTER':
            return{
                ...state,
                read: action.read
            }
        //Return existing state by default
        default:
            return state;
    }
}

export default teacherQuestionsFiltersReducer;
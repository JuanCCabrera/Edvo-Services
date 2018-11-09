const questionsFiltersReducerDefaultState = {
    text: '',
};

const questionsFiltersReducer = (state = questionsFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_QUESTIONS_TEXT_FILTER':
            return{
                text: action.text
            };
        default:
            return state;
    }
}

export default questionsFiltersReducer;
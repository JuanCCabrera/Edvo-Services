//Reducer default state
const questionsFiltersReducerDefaultState = {
    text: '',
};

/**
 * questionsFiltersReducer - Modifies the question filter state to change the data returned by the questions selector. 
 * @param {*} state -  Filter state
 * @param {*} action - Action received from dispatcher
 */
const questionsFiltersReducer = (state = questionsFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_QUESTIONS_TEXT_FILTER':
            return{
                text: action.text
            };
        //Return existing state by default
        default:
            return state;
    }
}

export default questionsFiltersReducer;
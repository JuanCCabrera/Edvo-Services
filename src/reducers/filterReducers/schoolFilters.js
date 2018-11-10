//Reducer default state
const schoolsFiltersReducerDefaultState = {
    text: '',
};

/**
 * schoolsFiltersReducer - Modifies the school filter state to change the data returned by the schools selector. 
 * @param {*} state - Filter state
 * @param {*} action - Action received from dispatcher
 */
const schoolsFiltersReducer = (state = schoolsFiltersReducerDefaultState, action) => {
    switch (action.type){
        //Set text filter
        case 'SET_SCHOOLS_TEXT_FILTER':
            return{
                text: action.text
            };
        //Return existing state by default
        default:
            return state;
    }
}

export default schoolsFiltersReducer;
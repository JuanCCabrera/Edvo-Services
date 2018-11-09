const schoolsFiltersReducerDefaultState = {
    text: '',
};

const schoolsFiltersReducer = (state = schoolsFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_SCHOOLS_TEXT_FILTER':
            return{
                text: action.text
            };
        default:
            return state;
    }
}

export default schoolsFiltersReducer;
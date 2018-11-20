//Reducer default state
const successModalReducerDefaultState = {
    successModalFlag: false
};

/**
 * successModalReducer - Receives and toggles indicator of whether the success modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const successModalReducer = (state = successModalReducerDefaultState, action) => {
    switch(action.type){
        //Toggle success modal
        case 'TOGGLE_SUCCESS_MODAL':
            return{
                successModalFlag: !state.successModalFlag
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default successModalReducer;
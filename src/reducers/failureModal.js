//Reducer default state
const failureModalReducerDefaultState = {
    failureModalFlag: false
};

/**
 * failureModalReducer - Receives and toggles indicator of whether the failure modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const failureModalReducer = (state = failureModalReducerDefaultState, action) => {
    switch(action.type){
        //Toggle success modal
        case 'TOGGLE_FAILURE_MODAL':
            return{
                failureModalFlag: !state.failureModalFlag
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default failureModalReducer;
//Reducer default state
const loadingModalReducerDefaultState = {
    loadingModalFlag: false
};

/**
 * loadingModalReducer - Receives and toggles indicator of whether the loading modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const loadingModalReducer = (state = loadingModalReducerDefaultState, action) => {
    switch(action.type){
        //Toggle success modal
        case 'TOGGLE_LOADING_MODAL':
            return{
                loadingModalFlag: !state.loadingModalFlag
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default loadingModalReducer;
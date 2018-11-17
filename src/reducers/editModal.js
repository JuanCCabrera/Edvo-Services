//Reducer default state
const editModalReducerDefaultState = {
    editModalFlag: false
};

/**
 * editModalReducer - Receives and toggles indicator of whether the edit modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const editModalReducer = (state = editModalReducerDefaultState, action) => {
    switch(action.type){
        //Toggle edit modal
        case 'TOGGLE_EDIT_MODAL':
            return{
                editModalFlag: !state.editModalFlag
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default editModalReducer;
//Reducer default state
const planReducerDefaultState = {
    plan: {
        name: '',
        status: ''
    }
};

/**
 * planReducer - Receives and logs Teacher plans data which will be displayed in the Teacher Plans page. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const planReducer = (state = planReducerDefaultState, action) => {
    switch(action.type){
        //Log Teacher plan information
        case 'LOAD_PLAN':
            return {...action.plan}
        //Return existing state by default
        default: 
            return {...state}
    }
}

export default planReducer;
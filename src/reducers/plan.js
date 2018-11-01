const planReducerDefaultState = {
    plan: {
        name: '',
        status: ''
    }
};

const planReducer = (state = planReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_PLAN':
            return {...action.plan}
         default: 
            return {...state}
    }
}

export default planReducer;
const classesReducerDefaultState = [];

const classesReducer = (state = classesReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_CLASS':
            return [...state, action.class];
        case 'REMOVE_CLASS':
            return state.filter(({classInfoId}) => classInfoId !== action.classInfoId);
        default: 
            return [...state]
    }
}

export default classesReducer;

/*
    class: {
        userId: '',
        classInfoId: '',
        subject: '',
        format: '',
        language: '',
        level: '',
        groupSize: '',
        topicA: '',
        topicB: '',
        topicC: '',
    }
*/
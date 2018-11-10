//Reducer default state
const classesReducerDefaultState = [];

/**
 * classesReducer - Receives and logs classes which belong to a single user of the Teacher type. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const classesReducer = (state = classesReducerDefaultState, action) => {
    switch(action.type){
        //Log class
        case 'LOAD_CLASS':
            return [...state, action.class];
        //Remove class from list of classes
        case 'REMOVE_CLASS':
            return state.filter(({classInfoId}) => classInfoId !== action.classInfoId);
        //Return existing state by default
        default: 
            return [...state]
    }
}

export default classesReducer;

//Class object model
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
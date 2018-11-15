//Reducer default state
const questionReducerDefaultState = [];

/**
 * questionsReducer - Receives and logs questions which will be displayed in the Pending Questions list or which have been recently uploaded to the database.
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const questionsReducer = (state = questionReducerDefaultState, action) => {
    switch(action.type){
        //Log question to display in Pending Questions list
        case 'LOAD_QUESTION':
            return [...state, action.question_item];
        //New question upload
        case 'CREATE_QUESTION':
            return [...state];
        //Remove question from list of questions
        case 'REMOVE_QUESTION':
            return state.filter(({askedDate,userId}) => askedDate !== action.askedDate && userId !== action.userId);
        case 'ANSWER_QUESTION':
        //Remove question from Pending Questions list once it has been answered
            return state.filter(({askedDate,userId}) => askedDate !== action.askedDate && userId !== action.userId);
        //Return existing state by default
        default: 
            return [...state]
    }
}

export default questionsReducer;

//Question Object Model
/*
    question_item: {
        question: '',
        askedDate: '',
        subject: '',
        userId: ''
    }
*/
const questionReducerDefaultState = [];

const questionsReducer = (state = questionReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_QUESTION':
            return [...state, action.question_item];
        case 'CREATE_QUESTION':
            return [...state];
        case 'REMOVE_QUESTION':
            //TO-DO: SPEAK TO TAMARA ABOUT THIS!!!!!******
            return state.filter(({questionID, askedDate,userId}) => questionID !== action.questionID);
        case 'ANSWER_QUESTION':
            return [...state];
        default: 
            return [...state]
    }
}

export default questionsReducer;

/*
    question_item: {
        questionID: '',
        question: '',
        askedDate: '',
        subject: '',
        userId: ''
    }
*/
const questionReducerDefaultState = [];

const questionsReducer = (state = questionReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_QUESTION':
            return [...state, action.question_item];
        case 'CREATE_QUESTION':
            return [...state];
        case 'REMOVE_QUESTION':
            return state.filter(({askedDate,userId}) => askedDate !== action.askedDate && userId !== action.userId);
        case 'ANSWER_QUESTION':
            return state.filter(({askedDate,userId}) => askedDate !== action.askedDate && userId !== action.userId);
        default: 
            return [...state]
    }
}

export default questionsReducer;

/*
    question_item: {
        question: '',
        askedDate: '',
        subject: '',
        userId: ''
    }
*/
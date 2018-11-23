const quizReducerDefaultState = [];

const quizzesReducer = (state = quizReducerDefaultState, action) => {
    switch(action.type){
        case 'CREATE_QUIZ':
            return [...state, action.quiz_item];
        case 'ANSWER_QUESTION':
            return [...state];
        case 'RESET':
            return []
        default: 
            return [...state]
    }
}

export default quizzesReducer;
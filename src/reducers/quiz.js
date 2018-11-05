const quizReducerDefaultState = [];

const quizzesReducer = (state = quizReducerDefaultState, action) => {
    switch(action.type){
        case 'CREATE_QUIZ':
            console.log("IN STATE QUIZ: ", action.quiz_item);
            return [...state, action.quiz_item];
        case 'ANSWER_QUESTION':
            console.log('ANSWER_QUESTION');
            return [...state];
        default: 
            return [...state]
    }
}

export default quizzesReducer;
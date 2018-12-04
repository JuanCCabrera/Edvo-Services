//Quiz reducer default state
const quizReducerDefaultState = [];

/**
 * quizzesReducer - Receives and logs information of quizzes which are displyed in the Quizzes page. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const quizzesReducer = (state = quizReducerDefaultState, action) => {
    switch(action.type){
        //Log a quiz to display in the Quizzes page. 
        case 'CREATE_QUIZ':
            return [...state, action.quiz_item];
        //Return existing state when a quesiton is answered. 
        case 'ANSWER_QUESTION':
            return [...state];
        //Unload quiz information
        case 'RESET':
            return []
        //Return existing state by default
        default: 
            return [...state]
    }
}

export default quizzesReducer;
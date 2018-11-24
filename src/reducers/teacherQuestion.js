import moment from 'moment';
//Reducer default state
const teacherQuestionsReducerDefaultState = {
    teacherQuestions: [],
    selectedQuestion: {
        askedDate: '',
        subject: '', 
        question: '',
        answer: '',
        answerDate: '',
        rate: 0,
        favorite: false,
        read: false
    }
};

/**
 * teacherQuestionsReducer - Receives and logs information to display teacher questions in the Teacher Questions page and in the Question Modal.
 * Also receives and logs question rating and favoriting information. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received by dispatcher
 */
const teacherQuestionsReducer = (state = teacherQuestionsReducerDefaultState, action) => {
    switch(action.type){
        //Log question to display in the Teacher Questions page
        case 'UNLOAD_TEACHER_RECOMMENDATIONS':
            return {
                teacherQuestions: [],
                selectedQuestion: state.selectedQuestion
            }
        case 'LOAD_TEACHER_QUESTION':
            return {
                teacherQuestions: [...state.teacherQuestions, action.teacherQuestion],
                selectedQuestion: state.selectedQuestion
            }
        //Log question to display in the Question Modal
        case 'SELECT_QUESTION':
            return{
                teacherQuestions: [...state.teacherQuestions],
                selectedQuestion: action.selectedQuestion
            }
        //Remove question to make Question Modal invisible
        case 'CLEAR_SELECTED_QUESTION':
            return{
                teacherQuestions: [...state.teacherQuestions],
                selectedQuestion: {
                    askedDate: '',
                    subject: '', 
                    question: '',
                    answer: '',
                    answerDate: '',
                    rate: 0,
                    favorite: false,
                    read: false
                }
            }
        //Modify question rating and log it
        case 'RATE_QUESTION':
            return{
                teacherQuestions: state.teacherQuestions.map((question) => {
                    if(question.askedDate === action.askedDate){
                        question.rate = action.rate;
                    }
                    return question;
                }),
                selectedQuestion: {
                    ...state.selectedQuestion,
                    rate: action.rate
                }
            }
        //Modify question favorite status (mark as favorite), log it, and add question to the Favorite Questions List
        case 'ADD_FAVORITE_QUESTION':
            console.log("ADDING TO FAVORITES IN REDUCER: ",action.askedDate);
            return{
                teacherQuestions: state.teacherQuestions.map((question) => {
                    console.log("ADDING ASKING FAV: ",question.askedDate, " AND ", action.askedDate)
                    if(question.askedDate == action.askedDate){
                        question.favorite = true;
                    }
                    return question;
                }),
                selectedQuestion: {
                    ...state.selectedQuestion,
                    favorite: true
                }
            }
        //Modify quesiton favorite status (unfavorite), log it, and remove question from the Favorite Questions List
        case 'REMOVE_FAVORITE_QUESTION':
            return{
                teacherQuestions: state.teacherQuestions.map((question) => {
                    console.log("REMOVING ASKING FAV: ",question.askedDate, " AND ", action.askedDate)
                    if(question.askedDate== action.askedDate){
                        question.favorite = false;
                    }
                    return question;
                }),
                selectedQuestion: {
                    ...state.selectedQuestion,
                    favorite: false
                }
            }
        //Return existing state by default
        default: 
            return {...state}
    }
}

export default teacherQuestionsReducer;

/*
{
teacherQuestion: {
        askedDate: '',
        subject: '', 
        question: '',
        answer: '',
        answerDate: '',
        rate: 0,
        favorite: false,
        read: false
    }
}
*/
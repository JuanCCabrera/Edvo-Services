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

const teacherQuestionsReducer = (state = teacherQuestionsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_QUESTION':
            return {
                teacherQuestions: [...state.teacherQuestions, action.teacherQuestion],
                selectedQuestion: state.selectedQuestion
            }
        case 'SELECT_QUESTION':
            return{
                teacherQuestions: [...state.teacherQuestions],
                selectedQuestion: action.selectedQuestion
            }
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
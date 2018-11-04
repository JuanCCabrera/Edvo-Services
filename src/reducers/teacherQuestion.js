const teacherQuestionsReducerDefaultState = [];

const teacherQuestionsReducer = (state = teacherQuestionsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_QUESTION':
            return [...state, action.teacherQuestion];
        default: 
            return [...state]
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
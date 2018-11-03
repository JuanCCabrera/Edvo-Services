//Teacher Recommendations Action Generators

export const loadTeacherQuestion = (
    {
        askedDate =  '',
        subject = '',
        question = '',
        answer = '',
        answerDate = '',
        rate = 0,
        favorite = false,
        read = false,
    } = {}) => ({
        type: 'LOAD_TEACHER_QUESTION',
        teacherQuestion: {
            askedDate,
            subject,
            question,
            answer,
            answerDate,
            rate,
            favorite,
            read
        }
});

export const selectQuestion = (
    {
        askedDate =  '',
        subject = '',
        question = '',
        answer = '',
        answerDate = '',
        rate = 0,
        favorite = false,
        read = false,
    } = {}) => ({
        type: 'SELECT_QUESTION',
        selectedQuestion: {
            askedDate,
            subject,
            question,
            answer,
            answerDate,
            rate,
            favorite,
            read
        }
});

export const clearSelectedQuestion = () => ({type:'CLEAR_SELECTED_QUESTION'});


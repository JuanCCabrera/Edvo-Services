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

export const rateQuestion = ({askedDate = '', rate = 0} = {}) => (
    {
        type:'RATE_QUESTION',
        askedDate: askedDate,
        rate: rate
});

export const addFavoriteQuestion = ({askedDate = ''} = {}) => (
    {
        type:'ADD_FAVORITE_QUESTION',
        askedDate: askedDate
});

export const removeFavoriteQuestion = ({askedDate = ''} = {}) => (
    {
        type: 'REMOVE_FAVORITE_QUESTION',
        askedDate: askedDate
});





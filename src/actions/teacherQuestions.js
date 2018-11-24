//Teacher Questions Action Generators


/**
 * loadTeacherQuestion - Generates object indicating to the central controller to load a question to the Teacher Questions page. 
 * @param {*} param0 - Object containing the asked date, subject, question body, answer, date in which the answer was created, rating, a boolean indicating whether the question is a favorite (true = favorite), and a boolean indicating whether the question has been read (read = true)
 */
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

/**
 * selectQuestion - Generates object indicating to the central controller that it must display a Modal containing the information relating to the selected question. 
 * @param {*} param0 - Object containing information relating to a question from the Teacher Questions list. It must include the question's date in which it was asked,
 * its subject, question body, answer, date in which the answer was created, rating, boolean indicating whether the question is a favorite (favorite = true), and a boolean indicating whether
 * the question has been read (read = true)
 */
export const selectQuestion = (
    {
        askedDate =  '',
        subject = '',
        question = '',
        answer = '',
        answerDate = '',
        rate = 0,
        favorite = false,
        read = true,
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

export const unloadTeacherQuestions = () => {
    return {
        type: 'UNLOAD_TEACHER_QUESTIONS'
    }
};

/**
 * clearSelectedQuestion - Generates an object indicating to the central controller to remove the question information included within a Modal and to make the Modal invisible. 
 */
export const clearSelectedQuestion = () => ({type:'CLEAR_SELECTED_QUESTION'});

/**
 * rateQuestion - Generates an object indicating to the central controller to display a new rating for the question being shown on a Modal. 
 * @param {*} param0 - Object containing the date in which a question was asked and an associated rating for the question
 */
export const rateQuestion = ({askedDate = '', rate = 0} = {}) => (
    {
        type:'RATE_QUESTION',
        askedDate: askedDate,
        rate: rate
});

/**
 * addFavoriteQuestion - Generates an object indicating to the central controller to mark the selected question as a favorite, which displays it in the Favorite Teacher Questions List. 
 * @param {*} param0 - Object containing the date in which a question was asked
 */
export const addFavoriteQuestion = ({askedDate = ''} = {}) => (
    {
        type:'ADD_FAVORITE_QUESTION',
        askedDate: askedDate
});

/**
 * removeFavoriteQuestion - Generates and object indicating to the central controller to unmark the selected question as a favorite, which results in removing the question from the Favorite Teacher Questions List. 
 * @param {*} param0 - Object containing the date in which a question was asked
 */
export const removeFavoriteQuestion = ({askedDate = ''} = {}) => (
    {
        type: 'REMOVE_FAVORITE_QUESTION',
        askedDate: askedDate
});





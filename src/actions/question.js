export const loadQuestion = (
    {
        question = '',
        askedDate = '',
        subject = '',
        userId = ''
    } = {}) => {
        return {
            type: 'LOAD_QUESTION',
            question_item: {
                question,
                askedDate,
                subject,
                userId
            }
        }
};
//Question Action Generators

/**
 * createQuestion - Generates an object indicating to the central controller to create a new question. This information is obtained from the Ask Question Form. 
 * @param {*} param0 - Object containing basic information about a question, including the question body, the date in which it was asked, the question's subject and the ID of the user that made the question. 
 */
export const createQuestion = (
    {
        question = '',
        askedDate = '',
        subject = '',
        userId = ''
    } = {}) => {
        return {
            type: 'CREATE_QUESTION',
            question_item: {
                question,
                askedDate,
                subject,
                userId
            }
        }
};

/**
 * removeQuestion - Generates an object indicating to the central controller to remove a question with a certain date and user ID. 
 * @param {*} param0 - Object containing the date in which a question was asked and the ID of the user that wrote the question
 */
export const removeQuestion = ({askedDate, userId} = {}) => {
    return {
        type: 'REMOVE_QUESTION',
        askedDate: askedDate,
        userId: userId
    }
};

/**
 * answerQuestion - Generates an object indicating to the central controller to store the answer to a question in the application's database. 
 * @param {*} param0 - Object containing the date in which a question was asked, the ID of the user that wrote the question and the question's answer. 
 */
export const answerQuestion = ({askedDate, userId, answer} = {}) => {
    return{
        type: 'ANSWER_QUESTION',
        askedDate: askedDate,
        userId: userId,
        answer: answer
    }
}

export const reset = () => {
    return{
        type: 'RESET_TEACHER_QUESTIONS'
    }
}
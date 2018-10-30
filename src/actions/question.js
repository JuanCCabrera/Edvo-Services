export const loadQuestion = (
    {
        question = '',
        askedDate = '',
        subject = '',
        userId = ''
    } = {}) => {
        return {
            type: 'LOAD_QUESITON',
            question_item: {
                question,
                askedDate,
                subject,
                userId
            }
        }
};

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

export const removeQuestion = ({askedDate, userId} = {}) => {
    return {
        type: 'REMOVE_QUESTION',
        askedDate: askedDate,
        userId: userId
    }
};

export const answerQuestion = ({askedDate, userId, answer} = {}) => {
    return{
        type: 'ANSWER_QUESTION',
        askedDate: askedDate,
        userId: userId,
        answer: answer
    }
}
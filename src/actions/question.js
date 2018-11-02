import uuid from 'uuid';

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
                questionID: uuid(),
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
                questionID: uuid(),
                question,
                askedDate,
                subject,
                userId
            }
        }
};

export const removeQuestion = ({questionID, askedDate, userId} = {}) => {
    return {
        type: 'REMOVE_QUESTION',
        questionID: questionID,
        askedDate: askedDate,
        userId: userId
    }
};

export const answerQuestion = ({questionID, askedDate, userId, answer} = {}) => {
    return{
        type: 'ANSWER_QUESTION',
        questionID: questionID,
        askedDate: askedDate,
        userId: userId,
        answer: answer
    }
}
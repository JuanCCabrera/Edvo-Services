//Ask Question Action Generators

/**
 * sendAskedQuestion - Generates object with basic question information (subject and body). 
 * @param {*} param0 - Object containing the questions subject and body. 
 */
export const sendAskedQuestion = (
    {
        subject = '',
        body = '',
    } = {}) => {
    return {
    type: 'ASK_QUESTION',
        askedQuestion: {
            subject: subject,
            body: body,
        }
    }
};
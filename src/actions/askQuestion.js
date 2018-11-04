//Ask Question Action Generators

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
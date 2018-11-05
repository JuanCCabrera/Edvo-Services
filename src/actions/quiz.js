export const createQuiz = (
    {
        number = '',
        quizID = '',
        quizDate = '',
        items = [
            number = '',
            question = '',
            answers = []
        ]
    } = {}) => {
        console.log("IN ACTION Quiz ID: ", quizID);
        return {
            type: 'CREATE_QUIZ',
            quiz_item: {
                number,
                quizID,
                quizDate,
                items
            }
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
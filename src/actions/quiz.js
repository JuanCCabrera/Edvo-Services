//Loads a quiz from the response
export const createQuiz = (
    {
        correctChoices = {},
        quizID = '',
        quizDate = '',
        score = null,
        questions = {
            choices: {}
        }
    } = {}) => {
        return {
            type: 'CREATE_QUIZ',
            quiz_item: {
                correctChoices,
                quizID,
                quizDate,
                score,
                questions
            }
        }
};

export const reset = () => {
    return{
        type: 'RESET'
    }
}
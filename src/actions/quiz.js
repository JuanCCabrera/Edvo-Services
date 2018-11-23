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
        console.log("IN ACTION Quiz ID: ", quizID);
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
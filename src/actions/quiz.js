//Loads a quiz from the response

/**
 * createQuiz - Generates an object containing quiz information to store in the central controller. 
 * @param {*} param0 - Object contaiing the quiz's correct choices as a JSON, the ID of the quiz, the date in which the quiz was created,
 * the score associated to a quiz (which can be null or 0-12) and the quiz question's choices. 
 */
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

/**
 * reset - Generates a command keyword indicating to the central controller that it must erase all local quiz data. 
 */
export const reset = () => {
    return{
        type: 'RESET'
    }
}
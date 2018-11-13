//Loads a quiz from the response
export const createQuiz = (
    {
        number = '',
        quizID = '',
        quizDate = '',
        score = 0,
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
                score,
                items
            }
        }
};
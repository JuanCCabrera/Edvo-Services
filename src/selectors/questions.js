/**
 * getVisibleQuestions - Returns a list of Pending Questions which only includes the questions that have the specified input text in their subject or question body. 
 * @param {*} questions - Full array of Pending Questions, which are questions pending answers by the Edvo Tech staff. 
 * @param {*} param1 - A text filter input. This can be any string. 
 */
const getVisibleQuestions = (questions, {text}) => {
    return questions.filter((question) => {
        const questionMatch = question.question.toLowerCase().includes(text.toLowerCase());
        const subjectMatch = question.subject.toLowerCase().includes(text.toLowerCase());
        return (questionMatch || subjectMatch);
    });
};

export default getVisibleQuestions;
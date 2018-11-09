const getVisibleQuestions = (questions, {text}) => {
    return questions.filter((question) => {
        const questionMatch = question.question.toLowerCase().includes(text.toLowerCase());
        const subjectMatch = question.subject.toLowerCase().includes(text.toLowerCase());
        return (questionMatch || subjectMatch);
    });
};

export default getVisibleQuestions;
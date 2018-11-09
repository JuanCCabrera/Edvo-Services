const getVisibleTeacherQuestions = (teacherQuestions, {text,checkType}) => {
    return teacherQuestions.filter((question) => {
        const questionMatch = question.question.toLowerCase().includes(text.toLowerCase());
        const subjectMatch = question.subject.toLowerCase().includes(text.toLowerCase());
        return (questionMatch || subjectMatch);
    }).sort((a,b) => {
        if(checkType === 'rate'){
            return a.rate < b.rate ? 1 : -1;
        }
    });
};

export default getVisibleTeacherQuestions;
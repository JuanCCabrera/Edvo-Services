//SET_TEXT_FILTER

export const setTeacherQuestionsTextFilter = (text = '') => ({
    type: 'SET_TEACHER_QUESTIONS_TEXT_FILTER',
    text: text
});

export const setTeacherQuestionsSorting = (checkType = '') => ({
    type: 'SET_TEACHER_QUESTIONS_SORTING',
    checkType: checkType
});
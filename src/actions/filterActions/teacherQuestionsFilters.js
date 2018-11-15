//Teacher Questions Filter Actions

/**
 * setTeacherQuestionsTextFilter - Sets the text filter for the list of questions available in the Teacher Questions page. 
 * @param {*} text - text field input entry
 */
export const setTeacherQuestionsTextFilter = (text = '') => ({
    type: 'SET_TEACHER_QUESTIONS_TEXT_FILTER',
    text: text
});

/**
 * setTeacherQuestionsSorting - Determines the sorting order for the list of questions available in the Teacher Questions page. 
 * @param {*} checkType - data sorting type. This field must be either 'date' or 'rate'. 
 */
export const setTeacherQuestionsSorting = (checkType = '') => ({
    type: 'SET_TEACHER_QUESTIONS_SORTING',
    checkType: checkType
});

/**
 * setTeacherQuestionsReadFilter - Determines the filtering status for all, read or unread questions available in the Teacher Questions page. 
 * @param {*} read - read status filter. This field must be either 'all', 'read', or 'not_read'
 */
export const setTeacherQuestionsReadFilter = (read = '') => ({
    type: 'SET_TEACHER_QUESTIONS_READ_FILTER',
    read: read
})
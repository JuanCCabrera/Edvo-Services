//Question Filter Actions

/**
 * setQuestionsTextFilter - Sets the text filtering for the list of pending questions which is accessible by Mentors and Administrators
 * @param {*} text - text filter input field entry 
 */
export const setQuestionsTextFilter = (text = '') => ({
    type: 'SET_QUESTIONS_TEXT_FILTER',
    text: text
});

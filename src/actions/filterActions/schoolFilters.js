//School Filter Actions

/**
 * setSchoolsTextFilter - Sets the text filter for the list of Schools available in the AppSchools page. 
 * @param {*} text - text filter input entry
 */
export const setSchoolsTextFilter = (text = '') => ({
    type: 'SET_SCHOOLS_TEXT_FILTER',
    text: text
});

//Teacher Recommendations Filter Actions

/**
 * setTeacherRecommendationsTextFilter - Sets the text filtering for the list of recommendations available in the Teacher Recommendations page. 
 * @param {*} text - text filter input entry
 */
export const setTeacherRecommendationsTextFilter = (text = '') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_TEXT_FILTER',
    text: text
});

/**
 * setTeacherRecommendationsSortingFilter - Determines the sorting order for the list of recommendations available in the Teacher Recommendations page. 
 * @param {*} checkType - data sorting type. This field must be either 'date' or 'rate'. 
 */
export const setTeacherRecommendationsSortingFilter = (checkType = 'date') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_SORTING_FILTER',
    checkType: checkType
});

/**
 * setTeacherRecommendationsReadFilter - Determines the filtering status for all, read or unread recommendations available in the Teacher Recommendations page. 
 * @param {*} read - read status filter. This field must be either 'all', 'read', or 'not_read'
 */
export const setTeacherRecommendationsReadFilter = (read = 'all') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_READ_FILTER',
    read: read
});
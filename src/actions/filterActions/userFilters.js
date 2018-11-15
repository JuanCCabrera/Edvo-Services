//User List Filter Actions

/**
 * setUserTextFilter - Sets the filtering text for the list of users available in the AppUsers and Assign Recommendations pages. 
 * @param {*} text - text filter input entry
 */
export const setUserTextFilter = (text = '') => ({
    type: 'SET_USER_TEXT_FILTER',
    text: text
});

/**
 * setWeeklyCheck - Determines the filtering status for all users, users which have received a recommendation during the current week and users which have not received a recommendation during the current week. 
 * @param {*} checkType - data sorting type. This field must be either 'all', 'assigned' or 'not_assigned.
 */
export const setWeeklyCheck = (checkType = '') => ({
    type: 'SET_WEEKLY_RECOMMENDATION_CHECK',
    checkType: checkType
});
//SET_TEXT_FILTER

export const setUserTextFilter = (text = '') => ({
    type: 'SET_USER_TEXT_FILTER',
    text: text
});

export const setWeeklyCheck = (checkType = '') => ({
    type: 'SET_WEEKLY_RECOMMENDATION_CHECK',
    checkType: checkType
});
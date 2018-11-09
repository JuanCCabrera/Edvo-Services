export const setTeacherRecommendationsTextFilter = (text = '') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_TEXT_FILTER',
    text: text
});

export const setTeacherRecommendationsSortingFilter = (checkType = 'date') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_SORTING_FILTER',
    checkType: checkType
});

export const setTeacherRecommendationsReadFilter = (read = 'all') => ({
    type: 'SET_TEACHER_RECOMMENDATIONS_READ_FILTER',
    read: read
});
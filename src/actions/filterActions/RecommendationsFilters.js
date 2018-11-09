export const setRecommendationsTextFilter = (text = '') => ({
    type: 'SET_RECOMMENDATIONS_TEXT_FILTER',
    text: text
});

export const setRecommendationsCategory = (category = '') => ({
    type: 'SET_RECOMMENDATIONS_CATEGORY_FILTER',
    category: category
});
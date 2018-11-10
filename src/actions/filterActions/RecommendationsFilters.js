//Recommendation Filter Actions

/**
 * setRecommendationsTextFilter - Sets the text filter for the list of recommendations availble in the Assign Recommendations and Manage Recommendations page. 
 * @param {*} text - text filter input field entry 
 */
export const setRecommendationsTextFilter = (text = '') => ({
    type: 'SET_RECOMMENDATIONS_TEXT_FILTER',
    text: text
});

/**
 * setRecommendationsCategory - Sets the category filtering for the list of recommendations available in the Assign Recommendations and Manage Recommendations page. 
 * Categories include:
 * Technology Integration
 * Time Management
 * Updated Material
 * Instruccional Alignment
 * Teaching Strategies
 * @param {*} category - selected filtering category
 */
export const setRecommendationsCategory = (category = '') => ({
    type: 'SET_RECOMMENDATIONS_CATEGORY_FILTER',
    category: category
});
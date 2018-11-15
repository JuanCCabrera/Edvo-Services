//Assign Recommendations Action Generators

/**
 * selectUser - Generates object containing the ID of a user which has been selected for a recommendation assignment. 
 * @param {*} param0 - Object containing a user ID. 
 */
export const selectUser = (
    {
        userID = ''
    } = {}) => ({
        type: 'SELECT_USER_TO_ASSIGN',
        userID: userID
});

/**
 * selectRecommendation - Generates object containing the ID of a recommendation that has been selected for recommendation assignment. 
 * @param {*} param0 - Object containing a recommendation ID. 
 */
export const selectRecommendation = ({
        recoID = ''
    } = {}) => ({
        type: 'SELECT_RECOMMENDATION_TO_ASSIGN',
        recoID: recoID
});


/**
 * clearSelection - Clears the selection of both a user and recommendation for recommendation assignment. 
 * Effectively restarts the assignment process. 
 */
export const clearSelection = () => ({
        type: 'CLEAR_RECOMMENDATION_SELECTION'
});

/**
 * assignRecommendation - Generates an object containing a command keyword which indicates that the central controller must proceed to assign a selected recommendation to a selected user. 
 */
export const assignRecommendation = () => ({
        type: 'ASSIGN_RECOMMENDATION'
});


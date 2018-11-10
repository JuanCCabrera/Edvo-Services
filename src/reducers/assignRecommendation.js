//Reducer default state
const assignRecommendationReducerDefaultState = {
    userID: '',
    recoID: '',
};

/**
 * assignRecommendationReducer - Receives and logs a user ID and recommendation ID linked to the assignment of a recommendation. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const assignRecommendationReducer = (state = assignRecommendationReducerDefaultState, action) => {
    switch (action.type) {
        //Log user selected for a recommendation assignment
        case 'SELECT_USER_TO_ASSIGN':
            return {...state, userID: action.userID};
        //Log recommendation selected for a recommendation assignment
        case 'SELECT_RECOMMENDATION_TO_ASSIGN':
            return {...state, recoID: action.recoID};
        //Clear log of selected user and recommendation
        case 'CLEAR_RECOMMENDATION_SELECTION':
            return {userID: '', recoID: ''};
        //Clear log of selected user and recommendation (received if an assignment was successful)
        case 'ASSIGN_RECOMMENDATION':
            return {userID: '', recoID: ''};
        //Return existing state by default
        default:
            return state;
    };
}

export default assignRecommendationReducer;


const assignRecommendationReducerDefaultState = {
    userID: '',
    recoID: '',
};

const assignRecommendationReducer = (state = assignRecommendationReducerDefaultState, action) => {
    switch (action.type) {
        case 'SELECT_USER':
            return {...state, userID: action.userID};
        case 'SELECT_RECOMMENDATION':
            return {...state, recoID: action.recoID};
        case 'CLEAR_RECOMMENDATION_SELECTION':
            return {userID: '', recoID: ''};
        case 'ASSIGN_RECOMMENDATION':
            return {userID: '', recoID: ''};
        default:
            return state;
    };
}

export default assignRecommendationReducer;


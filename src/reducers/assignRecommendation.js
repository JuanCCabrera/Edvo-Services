const assignRecommendationReducerDefaultState = {
    userID: '',
    recoID: ''
};

const assignRecommendationReducer = (state = assignRecommendationReducerDefaultState, action) => {
    switch (action.type) {
        case 'SELECT_USER':
            return {userID: action.userID};
        case 'SELECT_RECOMMENDATION':
            return {recoID: action.recoID};
        case 'CLEAR_RECOMMENDATION_SELECTION':
            return {userID: '', recoID: ''};
        default:
            return state;
    };
}

export default assignRecommendationReducer;


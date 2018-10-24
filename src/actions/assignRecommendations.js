//Select user for recommendation assignment
export const selectUser = (
    {
        userID = ''
    } = {}) => ({
        type: 'SELECT_USER',
        userID: userID
});

//Select recommendation to be assigned to a user
export const selectRecommendation = ({
        recoID = ''
    } = {}) => ({
        type: 'SELECT_RECOMMENDATION',
        recoID: recoID
});


//Clear selection of user and recommendation to be assigned
export const clearSelection = () => ({
        type: 'CLEAR_RECOMMENDATION_SELECTION'
});

//Make database request to assign a recommendation to a user
export const assignRecommendation = () => ({
        type: 'ASSIGN_RECOMMENDATION'
});


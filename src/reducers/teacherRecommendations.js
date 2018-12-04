//Reducer default state
const teacherRecommendationsReducerDefaultState = {
    recommendations: [],
    favoriteRecommendations: [],
    selectedRecommendation: {
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        read: false,
        rate: 0,
        isFavorite: undefined
    }
};

/**
 * teacherRecommendationsReducer - Receives and logs recommendation information to display in the Teacher Recommendations page and on the Recommendation Modal. 
 * Also logs information relating to recommendation ratings and favorite recommendations. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const teacherRecommendationsReducer = (state = teacherRecommendationsReducerDefaultState, action) => {
    switch(action.type){
        //Unload teacher recommendation data.  
        case 'UNLOAD_TEACHER_RECOMMENDATIONS':
        return {
            recommendations: [],
            favoriteRecommendations: [],
            selectedRecommendation: state.selectedRecommendation
        }
        //Log teacher recommendation information to display in the Teacher Recommendations page. 
        case 'LOAD_TEACHER_RECOMMENDATION':
            return {
                recommendations: [...state.recommendations, action.recommendation],
                favoriteRecommendations: [...state.favoriteRecommendations],
                selectedRecommendation: state.selectedRecommendation
            }
        //Log recommendation to display in both the Teacher Recommendations List and the Favorite Recommendations List.
        case 'LOAD_TEACHER_FAVORITE_RECOMMENDATION':
            return{
                favoriteRecommendations: [...state.favoriteRecommendations, action.favoriteRecommendation],
                selectedRecommendation: state.selectedRecommendation
            }
        //Log recommendation to display in the Recommendation Modal.
        case 'SELECT_RECOMMENDATION':
            return{
                recommendations: [...state.recommendations],
                favoriteRecommendations: [...state.favoriteRecommendations],
                selectedRecommendation: {
                    recoID: action.selectedRecommendation.recoID,
                    title: action.selectedRecommendation.title,
                    header: action.selectedRecommendation.header,
                    location: action.selectedRecommendation.location,
                    description: action.selectedRecommendation.description,
                    multimedia: action.selectedRecommendation.multimedia,
                    date: action.selectedRecommendation.date,
                    read: action.selectedRecommendation.read,
                    rate: action.selectedRecommendation.rate,
                    isFavorite: state.favoriteRecommendations.map((reco) => {
                        if(action.selectedRecommendation.recoID === reco.recoID){
                            return 1;
                        }else{
                            return 0;
                        }
                    })
                }
        }
        //Clear recommendation log to make Recommendation Modal invisible.
        case 'CLEAR_SELECTED_RECOMMENDATION':
            return{
                recommendations: [...state.recommendations],
                favoriteRecommendations: [...state.favoriteRecommendations],
                selectedRecommendation: {
                    recoID: '',
                    title: '',
                    header: '',
                    location: '',
                    description: '',
                    multimedia: '',
                    date: '',
                    read: false,
                    rate: 0,
                    isFavorite: undefined
                }
            }
        //Modify recommendation rating and log it.
        case 'RATE_RECOMMENDATION':
            return{
                recommendations: state.recommendations.map((reco) => {
                    if(reco.recoID === action.recoID){
                        reco.rate = action.rate;
                    }
                    return reco;
                }),
                favoriteRecommendations: state.favoriteRecommendations.map((reco) => {
                    if(reco.recoID === action.recoID){
                        reco.rate = action.rate;
                    }
                    return reco;
                }),
                selectedRecommendation: {
                    ...state.selectedRecommendation,
                    rate: action.rate
                }
            }
        //Modify recommendation favorite status (mark as favorite), log it, and add recommendation to the Favorite Recommendations List. 
        case 'ADD_FAVORITE_RECOMMENDATION':
        const newFavorites = [...state.favoriteRecommendations, action.favoriteRecommendation];
            return{
                recommendations: [...state.recommendations],
                favoriteRecommendations: newFavorites,
                selectedRecommendation: {
                    ...state.selectedRecommendation,
                    isFavorite: newFavorites.map((reco) => {
                        if(action.favoriteRecommendation.recoID === reco.recoID){
                            return 1;
                        }else{
                            return 0;
                        }
                    })
                }
            }
        //Modify recommendation favorite status (unfavorite), log it, and remove recommendation from the Favorite Recommendations List. 
        case 'REMOVE_FAVORITE_RECOMMENDATION':
            return{
                recommendations: [...state.recommendations],
                favoriteRecommendations: state.favoriteRecommendations.filter((reco) => {
                    return action.recoID !== reco.recoID;
                }),
                selectedRecommendation: {
                    ...state.selectedRecommendation,
                    isFavorite: undefined
                }
            }
        //Return existing state by default
        default: 
            return {...state}
    }
}

export default teacherRecommendationsReducer;

//Recommendation Object Model
/*
{
recommendation: {
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        read: false,
        rate: 0
    }
}

favoriteRecommendation: {
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        read: false,
        rate: 0
    }
}
*/
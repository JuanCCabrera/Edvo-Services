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

const teacherRecommendationsReducer = (state = teacherRecommendationsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_RECOMMENDATION':
            return {
                recommendations: [...state.recommendations, action.recommendation],
                favoriteRecommendations: [...state.favoriteRecommendations],
                selectedRecommendation: state.selectedRecommendation
            }
        case 'LOAD_TEACHER_FAVORITE_RECOMMENDATION':
            return{
                recommendations: [...state.recommendations, action.favoriteRecommendation],
                favoriteRecommendations: [...state.favoriteRecommendations, action.favoriteRecommendation],
                selectedRecommendation: state.selectedRecommendation
            }
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
        default: 
            return {...state}
    }
}

export default teacherRecommendationsReducer;

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
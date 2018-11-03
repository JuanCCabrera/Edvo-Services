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
        rate: 0
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
                recommendations: [...state.recommendations],
                favoriteRecommendations: [...state.favoriteRecommendations, action.favoriteRecommendation],
                selectedRecommendation: state.selectedRecommendation
            }
        case 'SELECT_RECOMMENDATION':
            return{
                recommendations: [...state.recommendations],
                favoriteRecommendations: [...state.favoriteRecommendations],
                selectedRecommendation: action.selectedRecommendation
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
                    rate: 0
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
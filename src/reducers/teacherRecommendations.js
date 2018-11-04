const teacherRecommendationsReducerDefaultState = {
    recommendations: [],
    favoriteRecommendations: []
};

const teacherRecommendationsReducer = (state = teacherRecommendationsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_RECOMMENDATION':
            return [...state, action.recommendation];
        case 'LOAD_TEACHER_FAVORITE_RECOMMENDATION':
            return [...state, action.favoriteRecommendation];
        default: 
            return [...state]
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
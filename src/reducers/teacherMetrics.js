const teacherMetricsReducerDefaultState = {
    daysInPlatform: 0,
    topRecommendations: [],
    mostRecentrecommendations: []
}

const teacherMetricsReducer = (state = teacherMetricsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_METRICS':
            return {
                daysInPlatform: action.daysInPlatform,
                topRecommendations: action.topRecommendations,
                mostRecentrecommendations: action.mostRecentrecommendations
            }
        default: 
            return {...state}
    }
}
export default teacherMetricsReducer;

/*
Default states of top and most recent recommendations

    topRecommendation:
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        rating: 0

    recentRecommendation:
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        rating: 0
*/
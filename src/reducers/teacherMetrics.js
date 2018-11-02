const teacherMetricsReducerDefaultState = {
    daysInPlatform: 0,
    topRecommendations: [],
    mostRecentrecommendations: []
}

const teacherMetricsReducer = (state = teacherMetricsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_TEACHER_DAYS_IN_PLATFORM':
            return {
                daysInPlatform: action.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        case 'LOAD_TEACHER_TOP_RECOMMENDATION':
            return {
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations, action.topRecommendation],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        case 'LOAD_TEACHER_RECENT_RECOMMENDATION':
            return{
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations, action.mostRecentrecommendation]
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
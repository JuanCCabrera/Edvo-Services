//Reducer default state
const teacherMetricsReducerDefaultState = {
    daysInPlatform: 0,
    topRecommendations: [],
    mostRecentrecommendations: []
}

/**
 * teacherMetricsReducer - Receives and logs teacher metrics to display in the Teacher Home page as the number of days the user has logged into the platform, 
 * the list of top-rated recommendations and the list of most recently assigned recommendations. 
 * @param {*} state - Reducer state 
 * @param {*} action - Action received from dispatcher
 */
const teacherMetricsReducer = (state = teacherMetricsReducerDefaultState, action) => {
    switch(action.type){
        //Log number of days teacher has logged into platform to display in the Teacher Home page.
        case 'LOAD_TEACHER_DAYS_IN_PLATFORM':
            return {
                daysInPlatform: action.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        //Log a top recommendation to display in the Top Recommendations List
        case 'LOAD_TEACHER_TOP_RECOMMENDATION':
            return {
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations, action.topRecommendation],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        //Log a most recent recommendation to display in the Recent Recommendations List
        case 'LOAD_TEACHER_RECENT_RECOMMENDATION':
            return{
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations, action.mostRecentrecommendation]
            }
        //Return existing state by default
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
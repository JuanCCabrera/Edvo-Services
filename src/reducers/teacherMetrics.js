//Reducer default state
const teacherMetricsReducerDefaultState = {
    recommendationsRead: 0,
    questionsAsked: 0,
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
        case 'RESET':
        return {
            recommendationsRead: 0,
            questionsAsked: 0,
            daysInPlatform: 0,
            topRecommendations: [],
            mostRecentrecommendations: []
        }
        //Log number of days teacher has logged into platform to display in the Teacher Home page.
        case 'LOAD_TEACHER_DAYS_IN_PLATFORM':
            return {
                recommendationsRead: state.recommendationsRead,
                questionsAsked: state.questionsAsked,
                daysInPlatform: action.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        case 'LOAD_TEACHER_QUESTIONS_ASKED':
            return {
                recommendationsRead: state.recommendationsRead,
                questionsAsked: action.questionsAsked,
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        case 'LOAD_TEACHER_RECOMMENDATIONS_READ':
            return {
                recommendationsRead: action.recommendationsRead,
                questionsAsked: state.questionsAsked,
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        //Log a top recommendation to display in the Top Recommendations List
        case 'LOAD_TEACHER_TOP_RECOMMENDATION':
            return {
                recommendationsRead: state.recommendationsRead,
                questionsAsked: state.questionsAsked,
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations, action.topRecommendation],
                mostRecentrecommendations: [...state.mostRecentrecommendations]
            }
        //Log a most recent recommendation to display in the Recent Recommendations List
        case 'LOAD_TEACHER_RECENT_RECOMMENDATION':
            return{
                recommendationsRead: state.recommendationsRead,
                questionsAsked: state.questionsAsked,
                daysInPlatform: state.daysInPlatform,
                topRecommendations: [...state.topRecommendations],
                mostRecentrecommendations: [...state.mostRecentrecommendations, action.mostRecentrecommendation]
            }
        //Change rating of recommendations in teacher metrics
        case 'RATE_TOP_AND_MOST_RATED':
            return{
                recommendationsRead: state.recommendationsRead,
                questionsAsked: state.questionsAsked,
                daysInPlatform: state.daysInPlatform,
                topRecommendations: state.topRecommendations.map((reco) => {
                    if(reco.recoID === action.recoID){
                        reco.rate = action.rate;
                    }
                    return reco;
                }),
                mostRecentrecommendations: state.mostRecentrecommendations.map((reco) => {
                    if(reco.recoID === action.recoID){
                        reco.rate = action.rate;
                    }
                    return reco;
                })
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
        rate: 0

    recentRecommendation:
        recoID: '',
        title: '',
        header: '',
        location: '',
        description: '',
        multimedia: '',
        date: '',
        rate: 0
*/
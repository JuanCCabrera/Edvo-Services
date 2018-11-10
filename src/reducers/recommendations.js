//Reducer default state
const recommendationsReducerDefaultState = [];

/**
 * recommendationReducer - Receives and logs information relating to recommendations which are displayed in the Assign and Manage Recommendations pages or which have bene uploaded to the database. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const recommendationsReducer = (state = recommendationsReducerDefaultState, action) => {
    switch(action.type){
        //Log recommendation to display in the Assign and Manage recommendations pages. 
        case 'LOAD_RECOMMENDATION':
            return [...state, action.recommendation];
        //Upload new recommendation
        case 'CREATE_RECOMMENDATION':
            return [...state];
        //Remove recommendation from the list of recommendations
        case 'REMOVE_RECOMMENDATION':
            return state.filter(({id}) => id !== action.id);
        //Update a recommendation with new information obtained from the Edit Recommendation page. 
        case 'EDIT_RECOMMENDATION':
        return state.map((recommendation) => {
            console.log(recommendation);
            if (recommendation.id === action.id) {
                return {
                    ...recommendation,
                    ...action.updates
                }
            }else{
                return recommendation;
            };
        });
        //Return existing state by default
        default: 
            return [...state]
    }
}

export default recommendationsReducer;

//Recommendation Object Model

/*
{
recommendation: {
        id: '',
        title: '',
        multimedia: '',
        header: '',
        description: '',
        teachingStrategies: false,
        updatedMaterial: false,
        timeManagement: false,
        technologyIntegration: false,
        instructionAlignment: false,
        moodle: false,
        googleClassroom: false,
        emailResource: false,
        applications: false,
        books: false,
        socialMedia: false,
        projector: false,
        computer: false,
        tablet: false,
        stylus: false,
        internet: false,
        smartboard: false,
        smartpencil: false,
        speakers: false,
        topics: [],
        location: '',
        subject: '',
        language: 'english',
        type: 'event',
        schoolType: 'public'
        format: ''
        groupSize: '',
        level: '',
        mentorID: '',
        question: '',
        choices: [],
        correctChoice: 0
    }
}

*/
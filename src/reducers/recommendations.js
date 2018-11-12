const recommendationsReducerDefaultState = [];

const recommendationsReducer = (state = recommendationsReducerDefaultState, action) => {
    switch(action.type){
        case 'LOAD_RECOMMENDATION':
            return [...state, action.recommendation];
        case 'UNLOAD_RECOMMENDATIONS':
            return [];
        case 'CREATE_RECOMMENDATION':
            return [...state];
        case 'REMOVE_RECOMMENDATION':
            return state.filter(({id}) => id !== action.id);
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
        default: 
            return [...state]
    }
}

export default recommendationsReducer;

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
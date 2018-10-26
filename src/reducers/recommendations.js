const recommendationsReducerDefaultState = [];

const recommendationsReducer = (state = recommendationsReducerDefaultState, action) => {
    switch(action.type){
        case 'CREATE_RECOMMENDATION':
            return [...state, action.recommendation];
        case 'REMOVE_RECOMMENDATION':
            return state.filter(({id}) => id !== action.id);
        default: 
            return [...state]
    }
}

export default recommendationsReducer;

/*
{
    recommendation: {
        this.state = {
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
        };


    }
}

*/
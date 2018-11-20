const assignmentRecommendationReducerDefaultState = {
    selectedAssignmentRecommendation:{
        title : '',
        header : '',
        description : '',
        teachingStrategies : false,
        updatedMaterial : false,
        timeManagement : false,
        technologyIntegration : false,
        instructionAlignment : false,
        topics : [''],
        location : '',
        subject : '',
        language : 'spanish',
        type : 'event',
        schoolType : 'public',
        format : 'classroom',
        level : 'Kindergarden - 3rd grade',
        size : '1 - 10'
    },
    assignmentRecommendationFlag: false
}

/**
 * assignmentRecommendationReducer - Receives and toggles indicator of whether the assignment recommendation modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const assignmentRecommendationReducer = (state = assignmentRecommendationReducerDefaultState, action) => {
    switch(action.type){
        //Toggle user modal
        //Select user to display in modal. 
        case 'SELECT_ASSIGNMENT_RECOMMENDATION_TO_DISPLAY':
            return{
                selectedAssignmentRecommendation: action.selectedAssignmentRecommendation,
                assignmentRecommendationFlag: true
            }
        //Clear modal information
        case 'CLEAR_ASSIGNMENT_RECOMMENDATION_MODAL':
            return{
                selectedAssignmentRecommendation: {
                    title : '',
                    header : '',
                    description : '',
                    teachingStrategies : false,
                    updatedMaterial : false,
                    timeManagement : false,
                    technologyIntegration : false,
                    instructionAlignment : false,
                    topics : [''],
                    location : '',
                    subject : '',
                    language : 'spanish',
                    type : 'event',
                    schoolType : 'public',
                    format : 'classroom',
                    level : 'Kindergarden - 3rd grade',
                    size : '1 - 10'
                },
                assignmentRecommendationFlag: false
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default assignmentRecommendationReducer;


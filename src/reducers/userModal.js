//Reducer default state
const userModalReducerDefaultState = {
    selectedUser:{
        name: '',
        lastName: '',
        email: '',
        subject: '',
        format: 'classroom',
        language: 'spanish',
        level: 'Kindergarden - 3rd grade',
        groupsize: '1 - 10', 
        topica: '', 
        topicb: '', 
        topicc: '',  
        moodle: false, 
        googleclassroom: false, 
        emails: false, 
        books: false, 
        applications: false, 
        socialmedia: false, 
        projector: false, 
        computer: false, 
        tablet: false, 
        stylus: false, 
        internet: false, 
        smartboard: false, 
        smartpencil: false , 
        speakers: false,
    },
    userModalFlag: false
}

/**
 * editModalReducer - Receives and toggles indicator of whether the edit modal must be displayed or not. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const userModalReducer = (state = userModalReducerDefaultState, action) => {
    switch(action.type){
        //Toggle user modal
        //Select user to display in modal. 
        case 'SELECT_USER_TO_DISPLAY':
            return{
                selectedUser: action.selectedUser,
                userModalFlag: true
            }
        //Clear modal information (Set default values). 
        case 'CLEAR_USER_MODAL':
            return{
                selectedUser: {
                    name: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    format: 'classroom',
                    language: 'spanish',
                    level: 'Kindergarden - 3rd grade',
                    groupsize: '1 - 10', 
                    topica: '', 
                    topicb: '', 
                    topicc: '',  
                    moodle: false, 
                    googleclassroom: false, 
                    emails: false, 
                    books: false, 
                    applications: false, 
                    socialmedia: false, 
                    projector: false, 
                    computer: false, 
                    tablet: false, 
                    stylus: false, 
                    internet: false, 
                    smartboard: false, 
                    smartpencil: false , 
                    speakers: false,
                },
                userModalFlag: false
            }
        //Return existing state by default
        default:
            return state;
    }
};

export default userModalReducer;


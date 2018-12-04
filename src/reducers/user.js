//Reducer default state
const userReducerDefaultState = [];

/**
 * userReducer - Receives and logs information relating to users which are displayed in the AppUsers and Assign Recommendations pages. 
 * @param {*} state - Reducer state 
 * @param {*} action - Action received from dispatcher
 */
const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        //Log user information to add to the AppUsers and Assign Recommendations pages. 
        case 'ADD_USER':
            //Add new user to user list
            return [...state, action.user];
        case 'UNLOAD_USERS':
            //Remove user from the AppUsers and Assign Recommendations pages. 
            return [];
        case 'REMOVE_USER':
            //Return existing state by default
            return state.filter(({id}) => id !== action.id);
        default:
            return [...state];
    };
}

export default userReducer;

//User Object Model
/*
user: {
        id: '',
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
        weeklyReco : false,
        categories: []
    }
*/


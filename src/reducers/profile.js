import moment from 'moment';

//Reducer default state
const profileReducerDefaultState = {
    name: '',
    lastName: '',
    dateOfBirth: moment().subtract('18',"years"),
    gender: 'male' 
}

/**
 * profileReducer - Receives and logs basic user profile data to display in the Settings page. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const profileReducer = (state = profileReducerDefaultState, action) => {
    switch(action.type){
        //Load information to edit in basic information form of Settings pages. 
        case 'LOAD_PROFILE':
        console.log(action.profile);
            return {...action.profile}
        default:
            return {...state}
    }
}

export default profileReducer;


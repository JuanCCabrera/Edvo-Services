//Reducer default state
const contactReducerDefaultState = {
    contact: {
        name: '',
        email: '',
        message: ''
    }
};

/**
 * contactReducer - Receives and logs contact form entry to indicate a successful upload to the database. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const contactReducer = (state = contactReducerDefaultState, action) => {
    switch (action.type) {
        //Log contact form input fields
        case 'SEND_CONTACT_FORM':
            return {...action.contact};
        //Return existing state by default
        default:
            return state;
    };
}

export default contactReducer;


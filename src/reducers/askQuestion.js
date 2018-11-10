//Reducer default state
const askQuestionReducerDefaultState = {
    askedQuestion: {
        subject: '',
        body: '',
    }
};

/**
 * askQuestionReducer - Receives and logs asked question as an indicator that the request to upload the asked question to the database was successful. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const askQuestionReducer = (state = askQuestionReducerDefaultState, action) => {
    switch (action.type) {
        //Logs asked question
        case 'ASK_QUESTION':
            return {...action.askedQuestion};
        //Returns existing state by default
        default:
            return state;
    };
}

export default askQuestionReducer;


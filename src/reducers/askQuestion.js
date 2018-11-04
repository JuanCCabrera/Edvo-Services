const askQuestionReducerDefaultState = {
    askedQuestion: {
        subject: '',
        body: '',
    }
};

const askQuestionReducer = (state = askQuestionReducerDefaultState, action) => {
    switch (action.type) {
        case 'ASK_QUESTION':
            console.log(state);
            return {...action.askedQuestion};
        default:
            return state;
    };
}

export default askQuestionReducer;


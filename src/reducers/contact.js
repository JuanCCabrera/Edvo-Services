const contactReducerDefaultState = {
    contact: {
        name: '',
        email: '',
        message: ''
    }
};

const contactReducer = (state = contactReducerDefaultState, action) => {
    switch (action.type) {
        case 'SEND_CONTACT_FORM':
            //SEND EMAIL
            console.log(state);
            return {...action.contact};
        default:
            return state;
    };
}

export default contactReducer;


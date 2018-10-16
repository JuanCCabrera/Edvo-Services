const languageReducerDefaultState = {
    lang: 'Spanish'
};

const languageReducer = (state = languageReducerDefaultState, action) => {
    switch(action.type){
        case 'SWAP_LANGUAGE':
            console.log(state.lang);
            if(state.lang === 'Spanish'){
                return{
                    lang: 'English'
                };
            }else if(state.lang === 'English'){
                return{
                    lang: 'Spanish'
                };
            };
        default:
            return state;
    }
};

export default languageReducer;
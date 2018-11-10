//Reducer default state
const languageReducerDefaultState = {
    lang: 'Spanish'
};

/**
 * languageReducer - Receives and logs indicator of the language in which the user interface will be displayed. 
 * @param {*} state - Reducer state
 * @param {*} action - Action received from dispatcher
 */
const languageReducer = (state = languageReducerDefaultState, action) => {
    switch(action.type){
        //Swap user interface language from English to Spanish or Spanish to English
        case 'SWAP_LANGUAGE':
            if(state.lang === 'Spanish'){
                return{
                    lang: 'English'
                };
            }else if(state.lang === 'English'){
                return{
                    lang: 'Spanish'
                };
            };
        //Return existing state by default
        default:
            return state;
    }
};

export default languageReducer;
import { createStore, combineReducers } from 'redux';
import languageReducer from '../reducers/language';
import contactReducer from '../reducers/contact';
import loginReducer from '../reducers/login';
import userReducer from '../reducers/user';
import schoolReducer from '../reducers/school';

//Store creation

export default () => {
    const store = createStore(
        combineReducers({
            language: languageReducer, 
            contact: contactReducer,
            login:  loginReducer,
            users: userReducer,
            schools: schoolReducer
        })
    );

    return store;
};



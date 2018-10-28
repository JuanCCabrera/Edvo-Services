import { createStore, combineReducers } from 'redux';
import languageReducer from '../reducers/language';
import contactReducer from '../reducers/contact';
import loginReducer from '../reducers/login';
import userReducer from '../reducers/user';
import schoolReducer from '../reducers/school';
import assignRecommendationReducer from '../reducers/assignRecommendation';
import recommendationsReducer from '../reducers/recommendations';
import questionsReducer from '../reducers/question';

//Store creation

export default () => {
    const store = createStore(
        combineReducers({
            language: languageReducer, 
            contact: contactReducer,
            login:  loginReducer,
            users: userReducer,
            schools: schoolReducer,
            assignRecommendation: assignRecommendationReducer,
            recommendations: recommendationsReducer,
            questions: questionsReducer
        })
    );

    return store;
};



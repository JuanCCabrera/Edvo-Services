import { createStore, combineReducers } from 'redux';
import languageReducer from '../reducers/language';
import contactReducer from '../reducers/contact';
import loginReducer from '../reducers/login';
import userReducer from '../reducers/user';
import schoolReducer from '../reducers/school';
import assignRecommendationReducer from '../reducers/assignRecommendation';
import recommendationsReducer from '../reducers/recommendations';
import questionsReducer from '../reducers/question';
import classesReducer from '../reducers/classes';
import planReducer from '../reducers/plan';
import teacherMetricsReducer from '../reducers/teacherMetrics';
import askQuestionReducer from '../reducers/askQuestion';
import teacherRecommendationsReducer from '../reducers/teacherRecommendations';
import teacherQuestionsReducer from '../reducers/teacherQuestion';
import userFiltersReducer from '../reducers/filterReducers/userFilters';
import teacherQuestionsFiltersReducer from '../reducers/filterReducers/teacherQuestionsFilter';
import questionsFiltersReducer from '../reducers/filterReducers/questionsFilters';
import recommendationsFiltersReducer from '../reducers/filterReducers/recommendationsFilters';
import teacherRecommendationsFiltersReducer from '../reducers/filterReducers/teacherRecommendationsFilters';
import schoolsFiltersReducer from '../reducers/filterReducers/schoolFilters';
import profileReducer from '../reducers/profile';

//Store creation

//Create central controller based on all reducers located in the /src/reducers folder. 

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
            questions: questionsReducer,
            classes: classesReducer,
            plan: planReducer,
            teacherMetrics: teacherMetricsReducer,
            askQuestion: askQuestionReducer,
            teacherRecommendations: teacherRecommendationsReducer,
            teacherQuestions: teacherQuestionsReducer,
            userFilters: userFiltersReducer,
            teacherQuestionsFilters: teacherQuestionsFiltersReducer,
            questionsFilters: questionsFiltersReducer,
            recommendationsFilters: recommendationsFiltersReducer,
            teacherRecommendationsFilters: teacherRecommendationsFiltersReducer,
            schoolFilters: schoolsFiltersReducer,
            profile: profileReducer
        })
    );

    return store; //Return store with all reducer functionality. 
};



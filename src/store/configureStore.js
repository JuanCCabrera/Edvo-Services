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
import quizzesReducer from '../reducers/quiz';

import userFiltersReducer from '../reducers/filterReducers/userFilters';
import teacherQuestionsFiltersReducer from '../reducers/filterReducers/teacherQuestionsFilter';
import questionsFiltersReducer from '../reducers/filterReducers/questionsFilters';
import recommendationsFiltersReducer from '../reducers/filterReducers/recommendationsFilters';
import teacherRecommendationsFiltersReducer from '../reducers/filterReducers/teacherRecommendationsFilters';
import schoolsFiltersReducer from '../reducers/filterReducers/schoolFilters';
import profileReducer from '../reducers/profile';
import successModalReducer from '../reducers/successModal';
import editModalReducer from '../reducers/editModal';
import userModalReducer from '../reducers/userModal';
import assignmentRecommendationReducer from '../reducers/assignmentRecommendationModal';
import failureModalReducer from '../reducers/failureModal';
import loadingModalReducer from '../reducers/loadingModal';
import credentialsReducer from '../reducers/credentials';
import loginPageReducer from '../reducers/loginPage';

//Store creation

//Create central controller based on all reducers located in the /src/reducers folder. 

export default () => {
    //Create application controller. 
    const store = createStore(
        //Combine all reducers in the system to handle all dispatchable actions. 
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
            quizzes: quizzesReducer,
            userFilters: userFiltersReducer,
            teacherQuestionsFilters: teacherQuestionsFiltersReducer,
            questionsFilters: questionsFiltersReducer,
            recommendationsFilters: recommendationsFiltersReducer,
            teacherRecommendationsFilters: teacherRecommendationsFiltersReducer,
            schoolFilters: schoolsFiltersReducer,
            profile: profileReducer,
            successModal: successModalReducer,
            editModal: editModalReducer,
            userModal: userModalReducer,
            assignmentRecommendationModal: assignmentRecommendationReducer,
            loadingModal: loadingModalReducer,
            failureModal: failureModalReducer,
            credentials: credentialsReducer,
            loginPage: loginPageReducer
        })
    );

    return store; //Return store with all reducer functionality. 
};



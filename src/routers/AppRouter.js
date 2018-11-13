import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Header from '../components/MainComponents/Header';
import Footer from '../components/MainComponents/Footer';
import MainPage from '../components/MainComponents/Main';
import AboutPage from '../components/MainComponents/About';
import LoginPage from '../components/MainComponents/Login';
import PlansPage from '../components/MainComponents/Plans';
import NotFoundPage from '../components/MainComponents/NotFound';
import SecuredRoute from '../SecuredRoute/SecuredRoute';
import Callback from '../Callback';
import Registration from '../components/MainComponents/Registration';

import Classes from '../components/TeacherComponents/Classes';
import Plan from '../components/TeacherComponents/Plan';
import TeacherHome from '../components/TeacherComponents/TeacherHome';
import TeacherProfile from '../components/TeacherComponents/TeacherProfile';

import MentorHome from '../components/MentorComponents/MentorHome';
import MentorProfile from '../components/MentorComponents/MentorProfile';

import SchoolHome from '../components/SchoolComponents/SchoolHome';
import SchoolProfile from '../components/SchoolComponents/SchoolProfile';

import AdminHome from '../components/AdminComponents/AdminHome';
import AppUsers from '../components/AdminComponents/AppUsers';
import AppSchools from '../components/AdminComponents/AppSchools';
import CreateUserForm from '../components/AdminComponents/CreateUserForm';
import CreateInstitutionForm from '../components/AdminComponents/CreateInstitutionForm';
import AdminProfile from '../components/AdminComponents/AdminProfile';

import RecommendationsControl from '../components/RecommendationComponents/RecommendationsControl';
import NewRecommendation from '../components/RecommendationComponents/NewRecommendation';
import ManageRecommendations from '../components/RecommendationComponents/ManageRecommendations';
import EditRecommendation from '../components/RecommendationComponents/EditRecommendation';

import ManageQuestions from '../components/QuestionComponents/ManageQuestions';
import AnswerQuestionForm from '../components/QuestionComponents/AnswerQuestionForm';
import TeacherRecommendations from '../components/TeacherComponents/TeacherRecommendations';
import TeacherQuestions from '../components/TeacherComponents/TeacherQuestions';

import RecommendationModal from '../components/TeacherComponents/RecommendationModal';
import { clearSelectedRecommendation } from '../actions/teacherRecommendations';

import QuestionModal from '../components/TeacherComponents/QuestionModal';
import {clearSelectedQuestion} from '../actions/teacherQuestions';

import ManageQuizzes from '../components/QuizComponents/ManageQuizzes';
import AnswerQuizForm from '../components/QuizComponents/AnswerQuizForm';

import Stripe from '../components/TeacherComponents/Stripe';


const AppRouter = (props) => (
    <BrowserRouter>
        <div>
            <Header/>
            <RecommendationModal clearSelectedRecommendation={() => props.dispatch(clearSelectedRecommendation())}/>
            <QuestionModal clearSelectedQuestion={() => props.dispatch(clearSelectedQuestion())}/>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={AboutPage}/>
                <Route path="/plans" component={PlansPage}/>
                <Route path="/login" component={LoginPage}/>
                <SecuredRoute path="/register" component={Registration}/>
                <Route path='/callback' component={Callback}/>
                <Route exact path='/callback' component={MainPage}/>

                {
                    //Teacher
                }
                <SecuredRoute path='/teacher/home' component={TeacherHome}/>
                <SecuredRoute path='/teacher/settings/info' component={TeacherProfile}/>
                <SecuredRoute path='/teacher/settings/classes' component={Classes}/>
                <SecuredRoute path='/teacher/settings/plans/payment' exact component={Stripe} />
                <SecuredRoute path='/teacher/settings/plans' component={Plan}/>
                <SecuredRoute path='/teacher/recommendations' component={TeacherRecommendations}/>
                <SecuredRoute path='/teacher/questions' component={TeacherQuestions}/>

                {
                    //Mentor
                }
                <SecuredRoute path='/mentor/home' component={MentorHome}/>
                <SecuredRoute path='/mentor/settings' component={MentorProfile}/> 
                
                {
                    //School
                }
                <SecuredRoute path='/school/home' component={SchoolHome}/>
                <SecuredRoute path='/school/settings' component={SchoolProfile}/>
                {
                    //Administrator
                }
                <SecuredRoute exact path='/admin/settings/info' component={AdminProfile}/>
                <SecuredRoute exact path='/admin/settings/users' component={AppUsers}/>
                <SecuredRoute exact path='/admin/settings/users/add' component={CreateUserForm}/>
                <SecuredRoute exact path='/admin/settings/schools' component={AppSchools}/>
                <SecuredRoute exact path='/admin/settings/schools/add' component={CreateInstitutionForm}/>
                <SecuredRoute path='/admin/home' component={AdminHome}/>

                {
                    //Staff Recommendations
                }
                <SecuredRoute exact path='/recommendations/assign' component={RecommendationsControl}/>
                <SecuredRoute exact path='/recommendations/create' component={NewRecommendation}/>
                <SecuredRoute exact path='/recommendations/manage' component={ManageRecommendations}/>
                <SecuredRoute path="/recommendations/edit/:id" component={EditRecommendation}/>

                {
                    //Staff Questions
                }
                <SecuredRoute exact path='/staff/questions' component={ManageQuestions}/>
                <SecuredRoute path="/staff/questions/:askedDate/:userId" component={AnswerQuestionForm}/>
                {
                    //Teacher Quizzes
                }
                <SecuredRoute exact path='/teacher/quizzes' component={ManageQuizzes}/>
                <SecuredRoute path="/teacher/quizzes/:quizID" component={AnswerQuizForm}/>

                <Route component={NotFoundPage}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default connect()(AppRouter);

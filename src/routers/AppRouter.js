import React from 'react';
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


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={AboutPage}/>
                <SecuredRoute path="/plans" component={PlansPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={Registration}/>
                <Route path='/callback' component={Callback}/>
                <Route exact path='/callback' component={MainPage}/>

                {
                    //Teacher
                }
                <Route path='/teacher/home' component={TeacherHome}/>
                <Route path='/teacher/settings/info' component={TeacherProfile}/>
                <Route path='/teacher/settings/classes' component={Classes}/>
                <Route path='/teacher/settings/plans' component={Plan}/>
                <Route path='/teacher/recommendations' component={TeacherRecommendations}/>
                <Route path='/teacher/questions' component={TeacherQuestions}/>

                {
                    //Mentor
                }
                <Route path='/mentor/home' component={MentorHome}/>
                <Route path='/mentor/settings' component={MentorProfile}/>
                {
                    //Administrator
                }
                <Route exact path='/admin/settings/info' component={AdminProfile}/>
                <Route exact path='/admin/settings/users' component={AppUsers}/>
                <Route exact path='/admin/settings/users/add' component={CreateUserForm}/>
                <Route exact path='/admin/settings/schools' component={AppSchools}/>
                <Route exact path='/admin/settings/schools/add' component={CreateInstitutionForm}/>
                <Route path='/admin/home' component={AdminHome}/>

                {
                    //Staff Recommendations
                }
                <Route exact path='/recommendations/assign' component={RecommendationsControl}/>
                <Route exact path='/recommendations/create' component={NewRecommendation}/>
                <Route exact path='/recommendations/manage' component={ManageRecommendations}/>
                <Route path="/recommendations/edit/:id" component={EditRecommendation}/>

                {
                    //Staff Questions
                }
                <Route exact path='/staff/questions' component={ManageQuestions}/>
                <Route path="/staff/questions/:askedDate/:userId" component={AnswerQuestionForm}/>

                <Route component={NotFoundPage}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default AppRouter;

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

import SuccessModal from '../components/SuccessModal';
import SuccessfulEditModal from '../components/SuccessfulEditModal';

import UserModal from '../components/AdminComponents/UserModal';
import {clearUserModal} from '../actions/userModal';

import AssignmentRecommendationModal from '../components/AdminComponents/AssignmentRecommendationModal';
import {clearAssignmentRecommendationModal} from '../actions/assignmentRecommendationModal';

import CreateCouponForm from '../components/AdminComponents/CreateCouponForm';

/**
 * AppRouter - Main routing component of the application. Contains a header element, two modals which 
 * are invisible unless a recommendation or question is selected, a footer, and a set of conditionally rendered pages.
 * Each page is rendered depending on the URL (route) being accessed. 
 * @param {*} props - Default component properties
 */
const AppRouter = (props) => (
    <BrowserRouter>
        <div>
        {
            //Header (Navigation Bar)
        }
            <Header/>
        {
            //Recommendation Modal (hidden until a recommendation is selected)
        }
            <RecommendationModal clearSelectedRecommendation={() => props.dispatch(clearSelectedRecommendation())}/>
        {
            //Question Modal (hidden until a question is selected)
        }
            <QuestionModal clearSelectedQuestion={() => props.dispatch(clearSelectedQuestion())}/>

        {
            //User Modal (hidden until user is selected)
        }
            <UserModal clearSelectedUser={() => props.dispatch(clearUserModal())}/>

        {
            //Assignment Recommendation Modal (hidden until recommendation is selected from the Assign Recommendations page)
        }
            <AssignmentRecommendationModal clearSelectedRecommendation={() => props.dispatch(clearAssignmentRecommendationModal())}/>

        {
            //Success Modal (hidden until a major action is completed successfully)
        }
            <SuccessModal/>

        {
            //Successful Edit Modal (hidden until any edits are made successfully)
        }
            <SuccessfulEditModal/>
        {
            //Switch component. Displays ONLY the component related to the specified route path (must match the page URL). 
        }
            <Switch>
                {
                    //Main Page components and Registration component
                }
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={AboutPage}/>
                <Route path="/plans" component={PlansPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={Registration}/>
                <Route path='/callback' component={Callback}/>
                <Route exact path='/callback' component={MainPage}/>

                {
                    //Teacher Components
                }
                <Route path='/teacher/home' component={TeacherHome}/>
                <Route path='/teacher/settings/info' component={TeacherProfile}/>
                <Route path='/teacher/settings/classes' component={Classes}/>
                <Route path='/teacher/settings/plans' component={Plan}/>
                <Route path='/teacher/recommendations' component={TeacherRecommendations}/>
                <Route path='/teacher/questions' component={TeacherQuestions}/>

                {
                    //Mentor Components
                }
                <Route path='/mentor/home' component={MentorHome}/>
                <Route path='/mentor/settings' component={MentorProfile}/>
                {
                    //Administrator Components
                }
                <Route exact path='/admin/settings/info' component={AdminProfile}/>
                <Route exact path='/admin/settings/users' component={AppUsers}/>
                <Route exact path='/admin/settings/users/add' component={CreateUserForm}/>
                <Route exact path='/admin/settings/schools' component={AppSchools}/>
                <Route exact path='/admin/settings/schools/add' component={CreateInstitutionForm}/>
                <Route exact path='/admin/settings/coupons' component={CreateCouponForm}/>
                <Route path='/admin/home' component={AdminHome}/>

                {
                    //Staff Recommendations Components
                }
                <Route exact path='/recommendations/assign' component={RecommendationsControl}/>
                <Route exact path='/recommendations/create' component={NewRecommendation}/>
                <Route exact path='/recommendations/manage' component={ManageRecommendations}/>
                <Route path="/recommendations/edit/:id" component={EditRecommendation}/>

                {
                    //Staff Questions Components
                }
                <Route exact path='/staff/questions' component={ManageQuestions}/>
                <Route path="/staff/questions/:askedDate/:userId" component={AnswerQuestionForm}/>

                {
                    //Route Not Found Page
                }
                <Route component={NotFoundPage}/>
            </Switch>
            {
                //Page Footer
            }
            <Footer/>
        </div>
    </BrowserRouter>
);

export default connect()(AppRouter);

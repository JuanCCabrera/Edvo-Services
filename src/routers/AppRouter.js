import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainPage from '../components/Main';
import AboutPage from '../components/About';
import LoginPage from '../components/Login';
import PlansPage from '../components/Plans';
import HelpPage from '../components/Help';
import NotFoundPage from '../components/NotFound';
import SecuredRoute from '../SecuredRoute/SecuredRoute';
import Callback from '../Callback';
import Registration from '../components/Registration';
import AdminHome from '../components/AdminHome';
import AdminProfileForm from '../components/AdminProfileForm';
import AdminProfile from '../components/AdminProfile';
import AppUsers from '../components/AppUsers';
import AppSchools from '../components/AppSchools';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={AboutPage}/>
                <Route path="/plans" component={PlansPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={Registration}/>
                <Route path='/callback' component={Callback}/>
                <Route exact path='/callback' component={MainPage}/>
                <Route path='/admin/home' component={AdminHome}/>
                <Route exact path='/admin/settings/info' component={AdminProfileForm}/>
                <Route exact path='/admin/settings/users' component={AppUsers}/>
                <Route exact path='/admin/settings/schools' component={AppSchools}/>
                <Route component={NotFoundPage}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default AppRouter;

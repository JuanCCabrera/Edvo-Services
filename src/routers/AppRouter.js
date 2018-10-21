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
                <Route component={NotFoundPage}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default AppRouter;

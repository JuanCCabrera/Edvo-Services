import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import TopRecommendationsList from './TopRecommendationsList';
import RecentRecommendationsList from './RecentRecommendationsList';
import AskQuestionForm from './AskQuestionForm';
import { sendAskedQuestion } from '../../actions/askQuestion';
import { reset, loadTeacherQuestionsAsked, loadTeacherRecentRecommendation, loadTeacherTopRecommendation, loadTeacherDaysInPlatform, loadTeacherRecommendationsRead } from '../../actions/teacherMetrics';
import { addFavoriteRecommendation, loadTeacherRecommendation, unloadTeacherRecommendations } from '../../actions/teacherRecommendations';
import Can from '../../Can';
import auth0Client from '../../Auth';
import axios from 'axios';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';
import { withRouter } from 'react-router-dom';
import { setRole, setAuthentication } from '../../actions/credentials';

/**
 * The Teacher Home page contains a value indicating the number of days the Teacher has spent on the platform, the number of recommendations
 * the teacher has read, the number of questions the teacher has asked, a list of the teacher's top rated recommendations, a list of the teacher's
 * most recently assigned recommendations and a form for the teacher to ask questions. 
 * @param {*} props - Default properties, teacher metrics, teacher recommendations list, teacher questions list, and current language state. 
 */

class TeacherHome extends React.Component {
    constructor(props) {
        super(props);
        //State contains information about how many days a teacher has logged in, the number of recommendations read, 
        //The number of questions asked by the user, and lists of top rated and most recent recommendations. 
        this.state = {
            daysInPlatform: 0,
            recommendationsRead: 0,
            questionsAsked: 0,
            topRecommendations: [],
            mostRecentrecommendations: []
        };
    }

    componentWillUnmount() {
        //Reset teacher home page information when unmounting component. 
        this.props.dispatch(reset());
        //Unload teacher recommendations when unmounting component. 
        this.props.dispatch(unloadTeacherRecommendations());
    }
    componentWillMount() {
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Get teacher home page information from the databse. 
        axios.get('https://beta.edvotech.com/api/teacher/home',
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            })
            .then(response => {
                //Load home page information to the controller. 
                this.props.dispatch(loadTeacherDaysInPlatform({ daysInPlatform: response.data.daysInPlatforms }));
                this.props.dispatch(loadTeacherQuestionsAsked({ questionsAsked: response.data.questionsasked }));
                this.props.dispatch(loadTeacherRecommendationsRead({ recommendationsRead: response.data.recommendationsRead }));

                //Load all Recent Recommendtations to the controller
                response.data.recentRecommendations.forEach(element => {
                    this.props.dispatch(loadTeacherRecentRecommendation({ recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rate: element.rate, read: element.read }));
                    //Load favorites
                    if (element.favorite == true) {
                        this.props.dispatch(addFavoriteRecommendation({
                            recoID: element.recomid, title: element.title,
                            header: element.header, location: element.location,
                            description: element.description,
                            multimedia: element.multimedia, date: element.date, read: element.read, rate: element.rate
                        }));
                    }
                });
                //Load all Top Rated Recommendations to the controller
                response.data.topRecommendations.forEach(element => {
                    this.props.dispatch(loadTeacherTopRecommendation({ recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rate: element.rate, read: element.read }));
                    //Load favorites
                    if (element.favorite == true) {
                        this.props.dispatch(addFavoriteRecommendation({
                            recoID: element.recomid, title: element.title,
                            header: element.header, location: element.location,
                            description: element.description,
                            multimedia: element.multimedia, date: element.date, read: element.read, rate: element.rate
                        }));
                    }
                });
                //Clear loading modal
                this.props.dispatch(setLoadingModal());
            })
            .catch(error => {
                //Clear loading modal
                this.props.dispatch(setLoadingModal());
                //Set failure modal
                this.props.dispatch(setFailureModal());
            })
        //Set user as logged in
        this.props.dispatch(setAuthentication({ isAuthenticated: true }));
        //Set user role as teacher. 
        this.props.dispatch(setRole({ role: "teacher" }));
    }
    render() {
        return (
            //Authenticate user information to grant access to Teacher Home page. 
            <Can
                role={auth0Client.getRole()}
                perform="teacher:home"
                yes={() => (
                    <div className="background-home">
                        <div className="container text-center">
                            {
                                //Page title
                            }
                            <h1 className="home__title">
                                {this.props.lang === 'English' ? 'My Dashboard' : 'Mi Tablero'}
                                <hr className="break" />
                            </h1>
                        </div>
                        <div className="container">
                            <div className="row text-center text-uppercase">
                                <div className="col-md-4">
                                    <div className="big-card-teacher-home" style={{ paddingBottom: '8.2rem' }}>
                                        {
                                            //Days in platform
                                        }
                                        <div>
                                            {this.props.lang === 'English' ?
                                                <div>
                                                    <p>Days in Platform</p>

                                                </div>
                                                :
                                                <div>
                                                    <p>Días en Plataforma</p>

                                                </div>}
                                            <p className="big__teacher__home__text">{this.props.teacherMetrics.daysInPlatform}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="big-card-teacher-home">
                                        {
                                            //Number of recommendations read (Acts as link to Teacher Recommendations page)
                                        }
                                        <div>
                                            <NavLink to="/teacher/recommendations" activeClassName="is-active" exact={true} style={{ textDecoration: 'none', color: 'black' }}>
                                                {this.props.lang === 'English' ?
                                                    <div>
                                                        <p>Recommendations Read</p>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p>Recomendaciones Leídas</p>
                                                    </div>}
                                                <p className="big__teacher__home__text">
                                                    {this.props.teacherMetrics.recommendationsRead}
                                                </p>

                                                <button className="btn btn-item">{this.props.lang === 'English' ? 'View Recommendations' : 'Ver Recomendaciones'}</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="big-card-teacher-home">
                                        {
                                            //Number of questions asked (Acts as link to Teacher Questions page)
                                        }
                                        <NavLink to="/teacher/questions" activeClassName="is-active" exact={true} style={{ textDecoration: 'none', color: 'black' }}>
                                            {this.props.lang === 'English' ?
                                                <div>
                                                    <p>Questions Asked</p>
                                                    <p className="big__teacher__home__text">
                                                        {this.props.teacherMetrics.questionsAsked}
                                                    </p>
                                                </div>
                                                :
                                                <div>
                                                    <p>Preguntas Hechas</p>
                                                    <p className="big__teacher__home__text">{this.props.teacherMetrics.questionsAsked}</p>
                                                </div>}
                                            <button className="btn btn-item">{this.props.lang === 'English' ? 'View Questions' : 'Ver Preguntas'}</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        {
                                            //Recent Recommendations List
                                        }
                                        <div>
                                            {this.props.lang === 'English' ?
                                                <div className="text-center home_card_title">
                                                    <p style={{ margin: '2rem 0' }}>
                                                        My Most Recent Recommendations
                                        </p>
                                                </div>
                                                :
                                                <div className="text-center home_card_title">
                                                    <p style={{ marginTop: '2rem', marginBottom: '0' }}>
                                                        Mis Recomendaciones
                                        </p>
                                                    <p style={{ marginTop: '0', marginBottom: '2rem' }}>
                                                        Más Recientes
                                        </p>
                                                </div>
                                            }
                                            <RecentRecommendationsList />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        {
                                            //Top Rated Recommendations List
                                        }
                                        <div>
                                            {this.props.lang === 'English' ?
                                                <div className="text-center home_card_title">
                                                    <p style={{ margin: '2rem 0' }}>
                                                        My Top-Rated Recommendations
                                        </p>
                                                </div>
                                                :
                                                <div className="text-center home_card_title">
                                                    <p style={{ marginTop: '2rem', marginBottom: '0' }}>
                                                        Mis Recomendaciones
                                        </p>
                                                    <p style={{ marginTop: '0', marginBottom: '2rem' }}>
                                                        Altamente Calificadas
                                        </p>
                                                </div>
                                            }
                                            <TopRecommendationsList />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        {
                                            //Ask Question Form
                                        }
                                        <div>
                                            {this.props.lang === 'English' ?
                                                <div className="text-center home_card_title">
                                                    <p style={{ marginBottom: '3.1rem', marginTop: '3rem' }}>
                                                        Ask a Question
                                        </p>
                                                </div>
                                                :
                                                <div className="text-center home_card_title">
                                                    <p style={{ marginBottom: '3.1rem', marginTop: '3rem' }}>
                                                        Envíe una Pregunta
                                        </p>
                                                </div>
                                            }
                                            <AskQuestionForm
                                                isInQuestionsPage={false}
                                                onSubmit={(question) => {
                                                    props.dispatch(sendAskedQuestion(question));
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                no={() => <Redirect to="/login" />}
            />);
    }
}

//Map teacher metrics, teacher recommendations, teacher questions, and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        role: state.credentials.role,
        isAuthenticated: state.credentials.isAuthenticated,
        teacherMetrics: state.teacherMetrics,
        teacherRecommendations: state.teacherRecommendations.recommendations,
        teacherQuestions: state.teacherQuestions.teacherQuestions,
        lang: state.language.lang,
    };
};
//Connect componet to controller.
export default connect(mapStateToProps)(TeacherHome);
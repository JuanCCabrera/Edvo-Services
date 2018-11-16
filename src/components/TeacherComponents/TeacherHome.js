import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import TopRecommendationsList from './TopRecommendationsList';
import RecentRecommendationsList from './RecentRecommendationsList';
import AskQuestionForm from './AskQuestionForm';
import { sendAskedQuestion } from '../../actions/askQuestion';
import { reset,loadTeacherQuestionsAsked, loadTeacherRecentRecommendation, loadTeacherTopRecommendation, loadTeacherDaysInPlatform, loadTeacherRecommendationsRead } from '../../actions/teacherMetrics';
import {loadTeacherRecommendation, unloadTeacherRecommendations} from '../../actions/teacherRecommendations';
import Can from '../../Can';
import auth0Client from '../../Auth';
import axios from 'axios';
/**
 * The Teacher Home page contains a value indicating the number of days the Teacher has spent on the platform, the number of recommendations
 * the teacher has read, the number of questions the teacher has asked, a list of the teacher's top rated recommendations, a list of the teacher's
 * most recently assigned recommendations and a form for the teacher to ask questions. 
 * @param {*} props - Default properties, teacher metrics, teacher recommendations list, teacher questions list, and current language state. 
 */

class TeacherHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            daysInPlatform: '',
            recommendationsRead: '',
            questionsAsked:'',
            topRecommendations: [],
            mostRecentrecommendations: []
        };
    }
    componentWillUnmount(){
        this.props.dispatch(reset());
        this.props.dispatch(unloadTeacherRecommendations());
    }
    componentWillMount(){
        console.log("PROPS IN HOME THIS: ",this.props);
        console.log("TEACHER HOME IS MOUNTING!!!!!!!!!!!!!!!!!!!")
        axios.get('http://localhost:3000/teacher/home',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            console.log("###################TEACHER HOME: ", response);
            this.setState({daysInPlatform: response.data.daysInPlatforms});
            this.setState({recommendationsRead: response.data.recommendationsRead});
            this.setState({questionsAsked: response.data.questionsasked});
            response.data.recentRecommendations.forEach(element => {
            this.props.dispatch(loadTeacherRecentRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rating: element.rate}));
            this.props.dispatch(loadTeacherRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rating: element.rate}));
            });
            response.data.topRecommendations.forEach(element => {
                this.props.dispatch(loadTeacherTopRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rating: element.rate}));
                });
        })
        .catch(error =>{
            console.log("TOEKN FOR HOME: ", auth0Client.getIdToken());
            console.log("ERROR RE: ", error.response.status);
            console.log("ERROR TEACHER HOMEE: ", error);
        })
    }
        render(){
            return(
    <Can
        role={auth0Client.getRole()}
        perform="teacher:home"
        yes={() => (

    <div>
        <div className="background-home">
            <div className="container text-center">
                    {
                        //Page title
                    }
                        <h1 className="home__title">
                            {this.props.lang === 'English' ? 'My Dashboard' : 'Mi Tablero'}
                            <hr className="break"/>
                        </h1>
            </div>
            <div className="container">
                <div className="row text-center">
                    <div className="col-sm-4 card card_left_margin">
                            {
                                //Days in platform
                            }
                            <div>
                                {this.props.lang === 'English' ? 
                                <div>
                                    <h2>Days in Platform</h2>
                                    
                                </div>
                                : 
                                <div>
                                    <h2>Días en Plataforma</h2>
                                    
                                </div>}
                                <br/>
                                <h1>{this.props.teacherMetrics.daysInPlatform}</h1>
                            </div>
                    </div>
                    <div className="col-sm-4 card">
                                    {
                                        //Number of recommendations read (Acts as link to Teacher Recommendations page)
                                    }
                                    <div>
                                        <NavLink to="/teacher/recommendations" activeClassName="is-active" exact={true} style={{textDecoration: 'none', color: 'black'}}>
                                            {this.props.lang === 'English' ? 
                                            <div>
                                                <h2>Recommendations Read</h2>
                                            </div>
                                            : 
                                            <div>
                                                <h2>Recomendaciones Leídas</h2>
                                            </div>}
                                            <h1>{this.props.teacherRecommendations.filter((reco) => {
                                                return reco.read === true;
                                            }).length}</h1>

                                            <button className="btn btn-item">{this.props.lang === 'English' ? 'View Recommendations' : 'Ver Recomendaciones'}</button>
                                        </NavLink>
                                    </div>
                    </div>
                    <div className="col-sm-4 card">
                                    {
                                        //Number of questions asked (Acts as link to Teacher Questions page)
                                    }
                                    <NavLink to="/teacher/questions" activeClassName="is-active" exact={true} style={{textDecoration: 'none', color: 'black'}}>
                                        {this.props.lang === 'English' ? 
                                        <div>
                                            <h2>Questions Asked</h2>
                                            <br/>
                                            <h1>{this.props.teacherQuestions.length}</h1>
                                        </div>
                                        : 
                                        <div>
                                            <h2>Preguntas Hechas</h2>
                                            <br/>
                                            <h1>{this.props.teacherQuestions.length}</h1>
                                        </div>}
                                        <button className="btn btn-item">{this.props.lang === 'English' ? 'View Questions' : 'Ver Preguntas'}</button>
                                    </NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 card card_left_margin low_card_title_margin">

                                    {
                                        //Recent Recommendations List
                                    }
                                    <div>
                                        {this.props.lang === 'English' ? 
                                            <div className="text-center"> 
                                                <h3 style={{marginBottom: '2rem'}}>
                                                    My Most Recent Recommendations
                                                </h3>
                                            </div>
                                            :
                                            <div className="text-center">
                                                <h3 style={{marginBottom: '0'}}>
                                                    Mis Recomendaciones
                                                </h3>
                                                <h3 style={{marginTop: '0',marginBottom: '2rem'}}>
                                                    Más Recientes
                                                </h3>
                                            </div>
                                        }
                                        <RecentRecommendationsList/>
                                    </div>
                    </div>
                    <div className="col-sm-4 card">
                                    {
                                        //Top Rated Recommendations List
                                    }
                                    <div>
                                        {this.props.lang === 'English' ? 
                                            <div className="text-center"> 
                                                <h3 style={{marginBottom: '2rem'}}>
                                                    My Top-Rated Recommendations
                                                </h3>
                                            </div>
                                            :
                                            <div className="text-center">
                                                <h3 style={{marginBottom: '0'}}>
                                                    Mis Recomendaciones
                                                </h3>
                                                <h3 style={{marginTop: '0', marginBottom: '2rem'}}>
                                                    Altamente Clasificadas
                                                </h3>
                                            </div>
                                        }
                                        <TopRecommendationsList/>
                                    </div>
                    </div>
                    <div className="col-sm-4 card">
                                    {
                                        //Ask Question Form
                                    }
                                    <div>
                                    {this.props.lang === 'English' ? 
                                            <div className="text-center"> 
                                                <h3 style={{marginBottom: '3.1rem', marginTop: '3rem'}}>
                                                    Ask a Question
                                                </h3>
                                            </div>
                                            :
                                            <div className="text-center">
                                                <h3 style={{marginBottom: '3.1rem', marginTop: '3rem'}}>
                                                    Envíe una Pregunta
                                                </h3>
                                            </div>
                                        }
                                        <AskQuestionForm 
                                        onSubmit={(question) => {
                                            this.props.dispatch(sendAskedQuestion(question));
                                        }}/>
                                    </div>
                    </div>
                </div>                     
            </div>
        </div>
    </div>
     )}
     no={() => <Redirect to="/" />}
   />);
    }
}

//Map teacher metrics, teacher recommendations, teacher questions, and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        teacherMetrics: state.teacherMetrics,
        teacherRecommendations: state.teacherRecommendations.recommendations,
        teacherQuestions: state.teacherQuestions.teacherQuestions,
        lang: state.language.lang,
        daysInPlatform: state.daysInPlatform
    };
};
//Connect componet to controller.
export default connect(mapStateToProps)(TeacherHome);
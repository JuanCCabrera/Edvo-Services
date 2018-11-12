import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import TopRecommendationsList from './TopRecommendationsList';
import RecentRecommendationsList from './RecentRecommendationsList';
import AskQuestionForm from './AskQuestionForm';
import { sendAskedQuestion } from '../../actions/askQuestion';
import { reset,loadTeacherQuestionsAsked, loadTeacherRecentRecommendation, loadTeacherTopRecommendation, loadTeacherDaysInPlatform, loadTeacherRecommendationsRead } from '../../actions/teacherMetrics';
import Can from '../../Can';
import auth0Client from '../../Auth';
import axios from 'axios';

class TeacherHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            daysInPlatform: '',
            recommendationsRead: '',
            questionsAsked:'',
            topRecommendations: [],
            mostRecentrecommendations: []
        };
    }
    componentWillUnmount(){
        this.props.dispatch(reset());
    }
    componentWillMount(){
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
            });
            response.data.topRecommendations.forEach(element => {
                this.props.dispatch(loadTeacherRecentRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rating: element.rate}));
                });
        })
        .catch(error =>{
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
        <div>
        <h1>{this.state.props.lang === 'English' ? 'Your Dashboard' : 'Su Tablero'}</h1>

        <div>
            {this.state.props.lang === 'English' ? 
            <div>
                <h2>Days in Platform</h2>
                
            </div>
            : 
            <div>
                <h2>Días en Plataforma</h2>
                
            </div>}
            <h2>{this.state.daysInPlatform}</h2>
        </div>

        <div>
            <NavLink to="/teacher/recommendations" activeClassName="is-active" exact={true}>
                {this.state.props.lang === 'English' ? 
                <div>
                    <h2>Recommendations Read</h2>
                </div>
                : 
                <div>
                    <h2>Recomendaciones Leídas</h2>
                </div>}
                <h2>{this.state.recommendationsRead}</h2>
            </NavLink>
        </div>

        <NavLink to="/teacher/questions" activeClassName="is-active" exact={true}>
            {this.state.props.lang === 'English' ? 
            <div>
                <h2>Questions Asked</h2>
                <h2>{this.state.questionsAsked}</h2>
            </div>
            : 
            <div>
                <h2>Preguntas Hechas</h2>
                <h2>{this.state.questionsAsked}</h2>
            </div>}
        </NavLink>

        <div>
            {this.state.props.lang === 'English' ? 
                <div> 
                    <h3>
                        Most Recent Recommendations
                    </h3>
                </div>
                :
                <div>
                    <h3>
                        Recomendaciones Más Recientes
                    </h3>
                </div>
            }
            <RecentRecommendationsList/>
        </div>

        <div>
            {this.state.props.lang === 'English' ? 
                <div> 
                    <h3>
                        Top Rated Recommendations
                    </h3>
                </div>
                :
                <div>
                    <h3>
                        Recomendaciones Altamente Clasificadas
                    </h3>
                </div>
            }
            <TopRecommendationsList/>
        </div>

        <div>
            {this.state.props.lang === 'English' ? 
                <div> 
                    <h3>
                        Ask a Question
                    </h3>
                </div>
                :
                <div>
                    <h3>
                        Envíe una Pregunta
                    </h3>
                </div>
            }
            <AskQuestionForm />
        </div>

        </div>
    </div>
     )}
     no={() => <Redirect to="/" />}
   />);
    }
}

const mapStateToProps = (state) => {
    return {
        teacherMetrics: state.teacherMetrics,
        teacherRecommendations: state.teacherRecommendations.recommendations,
        teacherQuestions: state.teacherQuestions.teacherQuestions,
        lang: state.language.lang,
        daysInPlatform: state.daysInPlatform
    };
};
export default connect(mapStateToProps)(TeacherHome);
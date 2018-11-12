import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import TopRecommendationsList from './TopRecommendationsList';
import RecentRecommendationsList from './RecentRecommendationsList';
import AskQuestionForm from './AskQuestionForm';
import { sendAskedQuestion } from '../../actions/askQuestion';

/**
 * The Teacher Home page contains a value indicating the number of days the Teacher has spent on the platform, the number of recommendations
 * the teacher has read, the number of questions the teacher has asked, a list of the teacher's top rated recommendations, a list of the teacher's
 * most recently assigned recommendations and a form for the teacher to ask questions. 
 * @param {*} props - Default properties, teacher metrics, teacher recommendations list, teacher questions list, and current language state. 
 */
const TeacherHome = (props) => (
    <div>
        <div>
        {
            //Page title
        }
        <h1>{props.lang === 'English' ? 'Your Dashboard' : 'Su Tablero'}</h1>

        {
            //Days in platform
        }
        <div>
            {props.lang === 'English' ? 
            <div>
                <h2>Days in Platform</h2>
                
            </div>
            : 
            <div>
                <h2>Días en Plataforma</h2>
                
            </div>}
            <h2>{props.teacherMetrics.daysInPlatform}</h2>
        </div>

        {
            //Number of recommendations read (Acts as link to Teacher Recommendations page)
        }
        <div>
            <NavLink to="/teacher/recommendations" activeClassName="is-active" exact={true}>
                {props.lang === 'English' ? 
                <div>
                    <h2>Recommendations Read</h2>
                </div>
                : 
                <div>
                    <h2>Recomendaciones Leídas</h2>
                </div>}
                <h2>{props.teacherRecommendations.filter((reco) => {
                    return reco.read === true;
                }).length}</h2>
            </NavLink>
        </div>

        {
            //Number of questions asked (Acts as link to Teacher Questions page)
        }
        <NavLink to="/teacher/questions" activeClassName="is-active" exact={true}>
            {props.lang === 'English' ? 
            <div>
                <h2>Questions Asked</h2>
                <h2>{props.teacherQuestions.length}</h2>
            </div>
            : 
            <div>
                <h2>Preguntas Hechas</h2>
                <h2>{props.teacherQuestions.length}</h2>
            </div>}
        </NavLink>

        {
            //Recent Recommendations List
        }
        <div>
            {props.lang === 'English' ? 
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

        {
            //Top Rated Recommendations List
        }
        <div>
            {props.lang === 'English' ? 
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

        {
            //Ask Question Form
        }
        <div>
            {props.lang === 'English' ? 
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
            <AskQuestionForm 
            onSubmit={(question) => {
                props.dispatch(sendAskedQuestion(question));
            }}/>
        </div>

        </div>
    </div>
);

//Map teacher metrics, teacher recommendations, teacher questions, and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        teacherMetrics: state.teacherMetrics,
        teacherRecommendations: state.teacherRecommendations.recommendations,
        teacherQuestions: state.teacherQuestions.teacherQuestions,
        lang: state.language.lang
    };
};
//Connect componet to controller.
export default connect(mapStateToProps)(TeacherHome);
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import TopRecommendationsList from './TopRecommendationsList';
import RecentRecommendationsList from './RecentRecommendationsList';
import AskQuestionForm from './AskQuestionForm';
import { sendAskedQuestion } from '../../actions/askQuestion';

const TeacherHome = (props) => (
    <div>
        <div>
        <h1>{props.lang === 'English' ? 'Your Dashboard' : 'Su Tablero'}</h1>

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

const mapStateToProps = (state) => {
    return {
        teacherMetrics: state.teacherMetrics,
        teacherRecommendations: state.teacherRecommendations,
        teacherQuestions: state.teacherQuestions,
        lang: state.language.lang
    };
};
export default connect(mapStateToProps)(TeacherHome);
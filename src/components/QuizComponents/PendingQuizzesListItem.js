import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

const PendingQuizzesListItem = (props) => (
        <div className="row">
            <div className="col-sm-3"/>
            <div className="col-sm-4">
                <div className="quiz-item-card">
                    {console.log("QUIZ PROPS ITEM: ", props)}
                    <p className="item__body card-title">
                        {props.lang === 'English' ? 'Quiz' : 'Prueba'} {moment(props.quiz.quizDate).format("YYYY-MM-DD")}
                    </p>
                    
                    {props.quiz.score == null && 
                        <Link to={`/teacher/quizzes/${props.quiz.quizID}`}>
                            <button>
                                <div className="btn btn-item">
                                    {props.lang === 'English' ? 'Answer' : 'Contestar'}
                                </div>
                            </button>
                        </Link>
                    }
                        
                    {props.quiz.score != null && 
                        <Link to={`/teacher/quizzes/view/${props.quiz.quizID}`}>
                            <button>
                                <div className="btn btn-item">
                                    {props.lang === 'English' ? 'View Answers' : 'Ver Contestaciones'}
                                </div>
                            </button>
                        </Link>
                    }

                    {props.quiz.score != null && <p>{props.lang === 'English' ? 'Score' : 'Puntuación'}: {props.quiz.score}</p>}
                </div>
            </div>
            <div className="col-sm-5"/>        
        </div>
);

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(PendingQuizzesListItem);



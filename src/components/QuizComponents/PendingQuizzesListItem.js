import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

/**
 * Single list item of the Teacher Quizzes list. 
 * @param {*} props - Default component properties
 */
const PendingQuizzesListItem = (props) => (
        <div className="row">
            <div className="col-sm-3"/>
            <div className="col-sm-4">
                <div className="quiz-item-card">
                {
                    //Item title (Quiz + Date in which it was issued to user). 
                }
                    <p className="item__body card-title">
                        {props.lang === 'English' ? 'Quiz' : 'Prueba'} {moment(props.quiz.quizDate).format("YYYY-MM-DD")}
                    </p>
                    
                {
                    //Display button to answer the quiz if the quiz does not have a score. 
                }
                    {props.quiz.score == null && 
                        <Link to={`/teacher/quizzes/${props.quiz.quizID}`}>
                            <button style={{margin: '0'}}>
                                <div className="btn btn-item">
                                    {props.lang === 'English' ? 'Answer' : 'Contestar'}
                                </div>
                            </button>
                        </Link>
                    }
                        
                {
                    //Display quiz score if the quiz has been completed by the user. 
                }
                    {props.quiz.score != null && 
                        <div>
                        <span>
                            {props.lang === 'English' ? 'Score' : 'Puntuación'}: {' '} {props.quiz.score}{'/12'}
                        </span>
                        <br/>

                        {
                            //Link to the View Answered Quiz page. 
                        }
                        <Link to={`/teacher/quizzes/view/${props.quiz.quizID}`}>
                            <button>
                                <div className="btn btn-item">
                                    {props.lang === 'English' ? 'View Answers' : 'Ver Contestaciones'}
                                </div>
                            </button>
                        </Link>
                        </div>
                    }
                    
                </div>
            </div>
            <div className="col-sm-5"/>        
        </div>
);

//Map langauge settings to the component properties. 
const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

//Connect component to the central controller. 
export default connect(mapStateToProps)(PendingQuizzesListItem);



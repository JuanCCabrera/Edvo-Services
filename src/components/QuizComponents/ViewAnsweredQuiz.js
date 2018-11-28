import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import moment from 'moment';
import {setLoadingModal} from '../../actions/loadingModal';
import {reset, createQuiz} from '../../actions/quiz';

class ViewAnsweredQuiz extends React.Component {
    constructor(props){
        super(props);
        console.log("PROPS OF VIEW: ", props);
        this.state = {
            props: props,
            answers: {},
            show: false,
            quizDate: props.quiz.quizDate,
            quizID: props.quiz.quizID,
            correctChoices: props.quiz.correctChoices,
            score: props.quiz.score
        };
    }

    render(){
        return (
            <div className="background-home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center well">
                                <QuizButtonList/>
                            </div>
                        </div>
                        <div className="col-sm-1"/>
                        <div className="col-sm-9">
                            <div className="big-card">
                                <p className="form__title">{this.props.lang === 'English' ? 'Quiz' : 'Prueba'} {moment(this.state.quizDate).format("MM-DD-YYYY")}</p>    
                                <p style={{fontWeight: 'bold', fontSize: '2rem'}}>{this.props.lang === 'English' ? 'Score' : 'Puntuación'}: {this.state.score} / 12</p>
                                                           
                                <br/>
                                {
                                    this.props.quiz.questions.questions.map((element, index) => {
                                        return ( <div>
                                        <p key= {uuid()}>{index+1}. {element.questionstring} </p>
                                        {
                                            //<p key= {uuid()} style={{fontSize: '1.35rem'}}>Relevant Recommendation: {element.recommendation}</p>
                                        }

                                        {element.choices.map((answer) =>{
                                            console.log("CORRECT CHOICES", this.state.correctChoices)
                                            if(answer.choiceid == this.state.correctChoices[element.questionid]){
                                                console.log("CORRECT CHOICES", answer.choiceid)
                                                return(<p key={uuid()}>{this.props.lang === 'English' ? 'Correct Answer' : 'Respuesta Correcta'}: {answer.choice}</p>)
                                            }
                                        })}
                                        <hr/>
                                        </div>)
                                })}

                                 {this.state.show === true && <h3 className="text-capitalize text-danger">PLEASE ANSWER ALL</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return{
        lang: state.language.lang,
        quiz: state.quizzes.find((quiz) => {
            return ((quiz.quizID == props.match.params.quizID));
        })
    };
};

export default connect(mapStateToProps)(ViewAnsweredQuiz);
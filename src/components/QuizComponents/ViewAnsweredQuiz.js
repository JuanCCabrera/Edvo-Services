import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import moment from 'moment';
import {setLoadingModal} from '../../actions/loadingModal';
import {setFailureModal} from '../../actions/failureModal';
import {reset, createQuiz} from '../../actions/quiz';

class ViewAnsweredQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: {},
            show: false,
        };
    }

    componentWillMount(){  
        this.props.dispatch(setLoadingModal());      
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            this.props.dispatch(reset());
            response.data.quizzes.forEach(element => {
                let correctChoices = {}
                let questions = []
                let questionsObject = {
                    questions: []
                }
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question,
                        recommendation: ''
                    }
                    questionObject.questionid = question.quizquestionid;
                    questionObject.recommendation = question.recommendationtitle
                    question.choices.forEach(choice => {
                        let choiceObject = {
                            choiceid: choice.choiceid,
                            choice: choice.choice
                        }
                        if(choice.correctanswer)
                            correctChoices[choice.quizquestionid] = choice.choiceid;
                        questionObject.choices.push(choiceObject);
                    })
                    questionsObject.questions.push(questionObject);
                });
                if(questionsObject.questions.length == 12)
                    this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}));
                
                });
            if(!this.props.quiz.score){
                this.props.dispatch(setFailureModal());
                this.props.history.replace('/teacher/quizzes');
            }
            this.props.dispatch(setLoadingModal()); 
        }).catch(error => {
            this.props.dispatch(setLoadingModal()); 
            this.props.dispatch(setFailureModal());
        });   
    }

    render(){
        return (
            <Can
            role={auth0Client.getRole()}
            perform="teacher:quizzes-view"
            yes={() => (
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

                                                           
                                <br/>
                                { this.props.quiz && 
                                    <div>
                                        <p className="form__title">{this.props.lang === 'English' ? 'Quiz' : 'Prueba'} {moment(this.props.quiz.quizDate).format("MM-DD-YYYY")}</p>    
                                        <p style={{fontWeight: 'bold', fontSize: '2rem'}}>{this.props.lang === 'English' ? 'Score' : 'Puntuación'}: {this.props.quiz.score} / 12</p>
                                        {this.props.quiz.questions.questions.map((element, index) => {
                                        return ( <div>
                                        <p key= {uuid()}>{index+1}. {element.questionstring} </p>
                                        {
                                            //<p key= {uuid()} style={{fontSize: '1.35rem'}}>Relevant Recommendation: {element.recommendation}</p>
                                        }

                                        {element.choices.map((answer) =>{
                                            if(answer.choiceid == this.props.quiz.correctChoices[element.questionid]){
                                                
                                                return(<p key={uuid()}>{this.props.lang === 'English' ? 'Correct Answer' : 'Respuesta Correcta'}: {answer.choice}</p>)
                                            }
                                        })}
                                        <hr/>
                                        </div>)
                                        })}
                                </div>
                            
                            }

                                 {this.state.show === true && <h3 className="text-capitalize text-danger">PLEASE ANSWER ALL</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            no={() => <Redirect to="/login" />}
          />
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
import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import {withRouter} from 'react-router-dom';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setLoadingModal} from '../../actions/loadingModal';
import {setFailureModal} from '../../actions/failureModal';
import {reset, createQuiz} from '../../actions/quiz';

class AnswerQuizForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: {},
            answersError: false,

            show: false
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
                if(this.props.quiz.score){
                    this.props.dispatch(setFailureModal());
                    this.props.history.replace('/teacher/quizzes');
                }
                this.props.dispatch(setLoadingModal()); 
            }).catch(error => {
                this.props.dispatch(setLoadingModal()); 
                this.props.dispatch(setFailureModal());
            });   
    }

    onAnswerChange = (e) => {
        e.preventDefault();
        const newAnswers = this.state.answers;
        newAnswers[e.target.name] = e.target.value;
        this.setState({answers: newAnswers });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let answers = [];
        //if(Object.keys(this.state.answers).length != 12)
        Object.keys(this.state.answers).forEach(questionid => {
            answers.push({quizquestionid: questionid, 
            choiceid: this.state.answers[questionid], 
            correctanswer: this.props.quiz.correctChoices[questionid] == this.state.answers[questionid] ? true : false})
        })     
        axios.post('https://beta.edvotech.com/api/teacher/quizzes/take',{
            quizid: this.props.quiz.quizID,
            answers: answers
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            if(response.data.statusCode == 201){
                this.props.history.push('/teacher/quizzes');
            }
        }).catch(error => {
            this.setState(() => ({show: true}));
        });
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
                            <form onSubmit={this.onSubmit}>
                                <div className="form__title">
                                    <p> {this.props.lang === 'English' ? 'Quiz' : 'Prueba'} </p>
                                </div>
                                {/* {this.props.quiz.quizDate} */}
                                
                                    {this.props.quiz && this.props.quiz.questions.questions.map((element, index) => {
                                        return ( <div key= {uuid()}>
                                        <p style={{fontSize: '1.8rem'}}>{index+1}. {element.questionstring} </p>
                                        {
                                            //<p  style={{fontSize: '1.7rem'}}>{element.recommendation}</p>
                                        }
                                        <br/>
                                        {this.props.lang === 'English' ? 'Answer: ' : 'Respuesta: '} 
                                        <div className="btn btn-default">
                                            <select name={element.questionid} onChange={this.onAnswerChange} value={this.state.answers[element.questionid]} required>
                                                <option  disabled selected></option>
                                            
                                            {element.choices.map(answer =>{
                                                return(<option key={uuid()} value={answer.choiceid}>{answer.choice}</option>)
                                            })}
                                            </select> 
                                        </div>
                                        <hr/>
                                        </div> )
                                })}
                            
                                {this.state.show === true && <p className="text-danger">{this.props.lang === 'English' ? 'Please answer all the quiz questions displayed above.' : 'Por favor, conteste todas las preguntas de la prueba.'}</p>}
                                <button type="submit" onClick={this.onSubmit}>
                                    <div className="btn btn-item">
                                        {this.props.lang === 'English' ? 'Answer' : 'Enviar'}
                                    </div>
                                </button>
                            </form>
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

export default withRouter(connect(mapStateToProps)(AnswerQuizForm));
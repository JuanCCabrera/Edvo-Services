import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setLoadingModal} from '../../actions/loadingModal';
import {reset, createQuiz} from '../../actions/quiz';

class AnswerQuizForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: {},

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
                console.log("REPSONSE OF QUIZ: ", response);
                let correctChoices = {}
                let questions = []
                let questionsObject = {
                    questions: []
                }
                response.data.quizzes.forEach(element => {
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
                    })
                    this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}))
                    console.log("CORRECT ANSEWRS ARE: ", correctChoices);
                    console.log("QUESTION OBJECT IS: ", questionsObject);
                    });
            });   
            this.props.dispatch(setLoadingModal()); 
    }

    onAnswerChange = (e) => {
        e.preventDefault();
        const newAnswers = this.state.answers;
        newAnswers[e.target.name] = e.target.value;
        this.setState({answers: newAnswers });
        console.log(this.state.answers);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('CORRECT ANSWERS', this.props.quiz.correctChoices);
        let answers = [];
        //if(Object.keys(this.state.answers).length != 12)
        Object.keys(this.state.answers).forEach(questionid => {
            console.log("QUESTION ID FOREACH: ", questionid);
            answers.push({quizquestionid: questionid, 
            choiceid: this.state.answers[questionid], 
            correctanswer: this.props.quiz.correctChoices[questionid] == this.state.answers[questionid] ? true : false})
            console.log("ANSWER ARRAY ", answers)
        })     
        axios.post('https://beta.edvotech.com/api/teacher/quizzes/take',{
            quizid: this.props.quiz.quizID,
            answers: answers
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            if(response.data.statusCode == 201)
                console.log("POST QUIZ RESPONSE: ", response);
                this.props.history.push('/teacher/quizzes');
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
                                    <h3> {this.props.lang === 'English' ? 'Quiz' : 'Prueba'} </h3>
                                    <hr/>
                                </div>
                                {/* {this.props.quiz.quizDate} */}
                                
                                    {this.props.quiz && this.props.quiz.questions.questions.map(element => {
                                        return ( <div><span key= {uuid()}>{element.recommendation}</span>
                                        <h3 style={{marginTop: '1rem'}} key= {uuid()}>{element.questionstring} </h3>
                                        <div className="btn btn-default">
                                            <select name={element.questionid} onChange={this.onAnswerChange} value={this.state.answers[element.questionid]} required>
                                                <option  disabled selected></option>
                                            
                                            {element.choices.map(answer =>{
                                                return(<option key={uuid()} value={answer.choiceid}>{answer.choice}</option>)
                                            })}
                                            </select> 
                                        </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </div> )
                                })}
                            
                                {this.state.show === true && <h3 className="text-capitalize text-danger">{this.props.lang === 'English' ? 'Please, answer all the questions displayed above.' : 'Por favor, conteste todas las preguntas de la prueba.'}</h3>}
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

export default connect(mapStateToProps)(AnswerQuizForm);
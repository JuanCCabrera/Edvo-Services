import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import {withRouter, Redirect} from 'react-router-dom';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setLoadingModal} from '../../actions/loadingModal';
import {setFailureModal} from '../../actions/failureModal';
import {setSuccessModal} from '../../actions/successModal';
import {reset, createQuiz} from '../../actions/quiz';
import Can from '../../Can';

/**
 * Form used to answer and submit a quiz based on 12 assigned recommendations. 
 */
class AnswerQuizForm extends React.Component {
    constructor(props){
        super(props);
        //State consists of a list of question answers and a boolean indicating whether an error message is shown or not. 
        this.state = {
            answers: {},
            answersError: false,

            show: false
        };
    }

    //Load quiz information when component mounts. 
    componentWillMount(){  
        //Set loading modal
            this.props.dispatch(setLoadingModal());   
            //Get quizzes information   
            axios.get('https://beta.edvotech.com/api/teacher/quizzes',
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            })
            .then(response => {
                //Unload all quizzes from controller. 
                this.props.dispatch(reset());
                //Load updated quiz data into controller. 
                response.data.quizzes.forEach(element => {
                    let correctChoices = {}
                    let questions = []
                    let questionsObject = {
                        questions: []
                    }
                    //format question data for each quiz. 
                    element.questions.forEach(question => {
                        let questionObject = {
                            questionid: '',
                            choices: [],
                            questionstring: question.question,
                            recommendation: ''
                        }
                        //Save question ID.
                        questionObject.questionid = question.quizquestionid;
                        //Save recommendation title information tied to each question. 
                        questionObject.recommendation = question.recommendationtitle
                        //Format quiz choices for each question. 
                        question.choices.forEach(choice => {
                            let choiceObject = {
                                choiceid: choice.choiceid,
                                choice: choice.choice
                            }
                            //Mark correct answer for each question. 
                            if(choice.correctanswer)
                                correctChoices[choice.quizquestionid] = choice.choiceid;
                            questionObject.choices.push(choiceObject);
                        })
                        questionsObject.questions.push(questionObject);
                    });
                    //If the number of questions received is 12, load the information into the controller as a new quiz. 
                    if(questionsObject.questions.length == 12)
                        this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}));
                    
                    });
                //If the quiz has a score, set a failure modal and navigate to the Teacher Quizzes page. (User attempted to retake quiz). 
                if(this.props.quiz.score){
                    this.props.dispatch(setFailureModal());
                    this.props.history.replace('/teacher/quizzes');
                }
                //Clear loading modal. 
                this.props.dispatch(setLoadingModal()); 
            }).catch(error => {
                //Clear loading modal and set failure modal on error. 
                this.props.dispatch(setLoadingModal()); 
                this.props.dispatch(setFailureModal());
            });   
    }

    //Set answer in local state. 
    onAnswerChange = (e) => {
        e.preventDefault();
        const newAnswers = this.state.answers;
        newAnswers[e.target.name] = e.target.value;
        this.setState({answers: newAnswers });
    }

    //Submit quiz
    onSubmit = (e) => {
        e.preventDefault();
        let answers = [];
        //Generate correct answers array
        Object.keys(this.state.answers).forEach(questionid => {
            answers.push({quizquestionid: questionid, 
            choiceid: this.state.answers[questionid], 
            correctanswer: this.props.quiz.correctChoices[questionid] == this.state.answers[questionid] ? true : false})
        });
        //Set loading modal
        this.props.dispatch(setLoadingModal()); 
        //Post information to database
        axios.post('https://beta.edvotech.com/api/teacher/quizzes/take',{
            quizid: this.props.quiz.quizID,
            answers: answers
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            //Set success modal and redirect user to Teacher Quizzes page on success. 
            if(response.data.statusCode == 201){
                this.props.dispatch(setSuccessModal()); 
                this.props.history.push('/teacher/quizzes');
            }
            //Clear loading modal
            this.props.dispatch(setLoadingModal()); 
        }).catch(error => {
            //Clear loading modal and show error message (incomplete quiz). 
            this.props.dispatch(setLoadingModal()); 
            this.setState(() => ({show: true}));
        });
    }

    render(){
        return (
            //Authenticate user information to grant access to Answer Quiz form. 
            <Can
            role={auth0Client.getRole()}
            perform="teacher:quizzes-view"
            yes={() => (
        <div className="background-home">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                    {
                        //Display link back to Teacher Recommendations page. 
                    }
                        <div className="text-center well">
                            <QuizButtonList/>
                        </div>
                    </div>
                    <div className="col-sm-1"/>
                    <div className="col-sm-9">
                        <div className="big-card">
                            <form onSubmit={this.onSubmit}>
                            {
                                //Quiz header
                            }
                                <div className="form__title">
                                    <p> {this.props.lang === 'English' ? 'Quiz' : 'Prueba'} </p>
                                </div>
                                
                                {
                                    //Mapping of quiz questions and dropdown answers
                                }
                                    {this.props.quiz && this.props.quiz.questions.questions.map((element, index) => {
                                        return ( <div key= {uuid()}>
                                        {
                                            //Quiz question
                                        }
                                        <p style={{fontSize: '1.8rem'}}>{index+1}. {element.questionstring} </p>
                                        {
                                            //<p  style={{fontSize: '1.7rem'}}>{element.recommendation}</p>
                                        }
                                        <br/>
                                        {
                                            //List of answers
                                        }
                                        {this.props.lang === 'English' ? 'Answer: ' : 'Respuesta: '} 
                                        <div className="btn btn-default">
                                            <select name={element.questionid} onChange={this.onAnswerChange} value={this.state.answers[element.questionid]} required>
                                                <option  disabled selected></option>
                                            {
                                                //Dropdown answers list
                                            }
                                            {element.choices.map(answer =>{
                                                return(<option key={uuid()} value={answer.choiceid}>{answer.choice}</option>)
                                            })}
                                            </select> 
                                        </div>
                                        <hr/>
                                        </div> )
                                })}
                                
                                {
                                    //Error message displayed incomplete quiz is submitted. 
                                }
                                {this.state.show === true && <p className="text-danger">{this.props.lang === 'English' ? 'Please answer all the quiz questions displayed above.' : 'Por favor, conteste todas las preguntas de la prueba.'}</p>}
                                {
                                    //Button to submit quiz. 
                                }
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
         )}
         //Redirect user to login page if not authorized. 
         no={() => <Redirect to="/login" />}
       />    
    );
    }
}

//Map language settings and quiz information to component properties. 
const mapStateToProps = (state, props) => {
    return{
        lang: state.language.lang,
        quiz: state.quizzes.find((quiz) => {
            return ((quiz.quizID == props.match.params.quizID));
        })
    };
};

//Connect component to router and central controller. 
export default withRouter(connect(mapStateToProps)(AnswerQuizForm));
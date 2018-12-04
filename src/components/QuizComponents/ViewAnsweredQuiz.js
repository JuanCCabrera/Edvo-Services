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
import Can from '../../Can';
import {Redirect} from 'react-router-dom';

/**
 * View Answered Quiz page allows a user to view the score they were given when a quiz is completed
 * and allows him or her to also view the correct answers for each quiz question. 
 */
class ViewAnsweredQuiz extends React.Component {
    constructor(props){
        super(props);
        //Quiz question answers and boolean used to display a potential error message are kept in the local state. 
        this.state = {
            answers: {},
            show: false,
        };
    }

    //Load quiz information while mounting. 
    componentWillMount(){  
        //Set loading modal. 
        this.props.dispatch(setLoadingModal());  
        //Get quiz information.     
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            //Unload quizzes from controller. 
            this.props.dispatch(reset());
            //Acquire information of user quizzes. 
            response.data.quizzes.forEach(element => {
                let correctChoices = {}
                let questions = []
                let questionsObject = {
                    questions: []
                }
                //Format quiz question information
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question,
                        recommendation: ''
                    }
                    //Save question ID and recommendation related to the question for each quiz question. 
                    questionObject.questionid = question.quizquestionid;
                    questionObject.recommendation = question.recommendationtitle
                    //Obtain array of quiz choices and the correct answer for each question. 
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
                //Load quiz information into central controller. 
                if(questionsObject.questions.length == 12)
                    this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}));
                
                });
            //If the quiz does not have a score (user attempted to take the quiz again by cheating). 
            if(!this.props.quiz.score){
                //Set failure modal
                this.props.dispatch(setFailureModal());
                //Redirect user to Teacher Quizzes page. 
                this.props.history.replace('/teacher/quizzes');
            }
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal()); 
        }).catch(error => {
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal()); 
            //Set failure modal
            this.props.dispatch(setFailureModal());
        });   
    }

    render(){
        return (
            //Authenticate user information to grant access to View Answered Quiz page. 
            <Can
            role={auth0Client.getRole()}
            perform="teacher:quizzes-view"
            yes={() => (
            <div className="background-home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                        {
                            //Quiz Button List (allows user to return to Teacher Quizzes page). 
                        }
                            <div className="text-center well">
                                <QuizButtonList/>
                            </div>
                        </div>
                        <div className="col-sm-1"/>
                        <div className="col-sm-9">
                            <div className="big-card">

                                                           
                                <br/>
                                {
                                    //If the quiz information exists...
                                }
                                { this.props.quiz && 
                                    <div>
                                        {
                                            //Display quiz title
                                        }
                                        <p className="form__title">{this.props.lang === 'English' ? 'Quiz' : 'Prueba'} {moment(this.props.quiz.quizDate).format("MM-DD-YYYY")}</p>    
                                        {
                                            //Display quiz score
                                        }
                                        <p style={{fontWeight: 'bold', fontSize: '2rem'}}>{this.props.lang === 'English' ? 'Score' : 'Puntuación'}: {this.props.quiz.score} / 12</p>
                                        {
                                            //For each quiz question...
                                        }
                                        {this.props.quiz.questions.questions.map((element, index) => {
                                        return ( <div>
                                        {
                                            //List quiz questions
                                        }
                                        <p key= {uuid()}>{index+1}. {element.questionstring} </p>
                                        {
                                            //<p key= {uuid()} style={{fontSize: '1.35rem'}}>Relevant Recommendation: {element.recommendation}</p>
                                        }
                                        {
                                            //Show quiz quesiton's correct answer. 
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
                                {
                                    //Unused error message
                                }
                                 {this.state.show === true && <h3 className="text-capitalize text-danger">PLEASE ANSWER ALL</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            //Redirect user to login page if unauthorized. 
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

//Connect component to the central controller. 
export default connect(mapStateToProps)(ViewAnsweredQuiz);
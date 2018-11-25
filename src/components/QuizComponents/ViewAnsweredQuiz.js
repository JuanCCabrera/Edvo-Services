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
                    <QuizButtonList/>
                    <h3>{moment(this.state.quizDate).format("YYYY-MM") } Quiz</h3>
                    <h3>Your score: {this.state.score} / 12</h3>
                    <br/>
                    {
                        this.props.quiz.questions.questions.map(element => {
                            return ( <div><h4 key= {uuid()}>Relevant Recommendation: {element.recommendation}</h4>
                            <h2 key= {uuid()}>{element.questionstring} </h2>
                            {element.choices.map(answer =>{
                                console.log("CORRECT CHOICES", this.state.correctChoices)
                                if(answer.choiceid == this.state.correctChoices[element.questionid]){
                                    console.log("CORRECT CHOICES", answer.choiceid)
                                    return(<h3 key={uuid()}>Correct Answer: {answer.choice}</h3>)
                                }
                            })}
                            <br/>
                            </div>)
                    })}
                     {this.state.show === true && <h3 className="text-capitalize text-danger">PLEASE ANSWER ALL</h3>}
                    
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return{
        quiz: state.quizzes.find((quiz) => {
            return ((quiz.quizID == props.match.params.quizID));
        })
    };
};

export default connect(mapStateToProps)(ViewAnsweredQuiz);
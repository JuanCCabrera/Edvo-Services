import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';

class AnswerQuizForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            answers: {},
            show: false,
            quizDate: props.quiz.quizDate,
            quizID: props.quiz.quizID,
            correctChoices: props.quiz.correctChoices
        };
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
        let answers = [];
        //if(Object.keys(this.state.answers).length != 12)
        Object.keys(this.state.answers).forEach(questionid => {
            console.log("QUESTION ID FOREACH: ", questionid);
            answers.push({quizquestionid: questionid, 
            choiceid: this.state.answers[questionid], 
            correctanswer: this.state.correctChoices[questionid] == this.state.answers[questionid] ? true : false})
            console.log("ANSWER ARRAY ", answers)
        })     
        axios.post('https://beta.edvotech.com/api/teacher/quizzes/take',{
            quizid: this.state.quizID,
            answers: answers
        },
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            console.log("POST QUIZ RESPONSE: ", response);
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <QuizButtonList/>
                    <h3> Quiz </h3>
                    {console.log("THE CORRECT CHOICES!!!!!!!", this.props.quiz.correctChoices)}
                    {/* {this.props.quiz.quizDate} */}
                    {
                        this.props.quiz.questions.questions.map(element => {
                            return ( <h3 key= {uuid()}>{element.questionstring} 
                            <select name={element.questionid} onChange={this.onAnswerChange} value={this.state.answers[element.questionid]} required>
                                <option  disabled selected></option>
                            {element.choices.map(answer =>{
                                return(<option key={uuid()} value={answer.choiceid}>{answer.choice}</option>)
                            })}
                            </select></h3> )
                    })}
                     {this.state.show === true && <h3 className="text-capitalize text-danger">PLEASE ANSWER ALL</h3>}
                    <button type="submit" onClick={this.onSubmit}>Answer</button>
                </form>
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

export default connect(mapStateToProps)(AnswerQuizForm);
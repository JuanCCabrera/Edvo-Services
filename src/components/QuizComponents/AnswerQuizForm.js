import React from 'react';
import {connect} from 'react-redux';
import { answerQuiz } from '../../actions/quiz';
import QuizButtonList from './QuizButtonList';
import uuid from 'uuid';
import axios from 'axios';

class AnswerQuizForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: {}
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
        //TO-DO Add error checks
        e.preventDefault();
        console.log("ANSWERS", this.state.answers);
        this.props.history.push('/teacher/quizzes');
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <QuizButtonList/>
                    <h3> Quiz </h3>
                    {this.props.quiz.quizDate}
                    {
                        this.props.quiz.items.map(element => {
                            return ( <h3 key= {uuid()}>{element[1]} 
                            <select name={element[0]} onChange={this.onAnswerChange} value={this.state.answers[element[0]]} required>
                                <option  disabled selected></option>
                            {element[2].map(answer =>{
                                return(<option key={uuid()} value={answer}>{answer}</option>)
                            })}
                            </select></h3> )
                    })}
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
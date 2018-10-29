import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion } from '../../actions/question';
import QuestionButtonList from './QuestionButtonList';
import {NavLink} from 'react-router-dom';

class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answer: ''
        };
    }

    onAnswerChange = (e) => {
        e.preventDefault();
        const answer = e.target.value;
        this.setState(() => ({answer}));
    }

    onSubmit = (e) => {
        //TO-DO Add error checks
        e.preventDefault();
        this.props.dispatch(answerQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId, answer: this.state.answer}));
        this.props.history.push('/staff/questions');
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <QuestionButtonList/>
                    <h3> Question </h3>
                        {this.props.question.question}
                    <h3> Answer </h3>
                        <textarea type="text" value={this.state.answer} placeholder="Write your answer here!" onChange={this.onAnswerChange}/>
                        <br/>
                        <button onClick={this.onSubmit}>Answer</button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return{
        question: state.questions.find((question) => {
            return ((question.askedDate == props.match.params.askedDate) && (question.userId === props.match.params.userId));
        })
    };
};

export default connect(mapStateToProps)(AnswerQuestionForm);
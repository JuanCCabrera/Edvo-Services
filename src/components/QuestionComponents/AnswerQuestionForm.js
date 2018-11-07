import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion } from '../../actions/question';
import QuestionButtonList from './QuestionButtonList';
import { loadTeacherQuestion } from '../../actions/teacherQuestions';
import moment from 'moment';

class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answer: '',
            answerError: false
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
        if(!this.state.answer){
            this.setState(() => ({answerError: true}));
        }else{
            this.setState(() => ({answerError: ''}));
            axios.post('http://localhost:8081/question/answer', {
                askedDate: this.state.askedDate,
                answer: this.state.answer,
                userID: this.state.userID
            }).then((response)=>{
                if(response.status == 200)
                this.props.history.push('/staff/questions');
            });
            this.setState(() => ({answerError: false}));
            this.props.dispatch(answerQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId, answer: this.state.answer}));
            this.props.history.push('/staff/questions');
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <QuestionButtonList/>
                    <h3> {this.props.lang === 'English' ? 'Question' : 'Pregunta'} </h3>
                        {this.props.question.question}
                    <h3> {this.props.lang === 'English' ? 'Answer' : 'Respuesta'} </h3>
                        <textarea type="text" value={this.state.answer} placeholder="Write your answer here!" onChange={this.onAnswerChange}/>
                        <br/>
                        {this.state.answerError}
                        <br/>
                        {this.state.answerError === true && 
                            <div className="text-danger">
                                {this.props.lang === 'English' ? <p>Please fill the 'Answer' field before submitting an answer.</p> : <p>Por favor, llene el espacio de 'Respuesta' antes de guardar la respuesta.</p>}
                            </div>
                        }
                        <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Answer' : 'Responder'}</button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return{
        question: state.questions.find((question) => {
            return ((question.askedDate == props.match.params.askedDate) && (question.userId === props.match.params.userId));
        }),
        lang: state.language.lang
    };
};

export default connect(mapStateToProps)(AnswerQuestionForm);
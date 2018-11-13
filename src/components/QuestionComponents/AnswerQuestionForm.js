import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion } from '../../actions/question';
import QuestionButtonList from './QuestionButtonList';
import { loadTeacherQuestion } from '../../actions/teacherQuestions';
import moment from 'moment';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        console.log("PROPSIN ANSEWR: ", props);
        this.state = {
            answer: '',
            answerError: false,
            userID: props.question.userId,
            askedDate: props.question.askedDate
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
            console.log("TEACHER ID TO ANSWER: ", this.state.userID);
            axios.post('http://localhost:3000/admin/questions/answer', {
                askeddate: moment(this.state.askedDate).format("YYYY-MM-DD HH:mm:ss"),
                answer: this.state.answer,
                teacherid: this.state.userID
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }}).then((response)=>{
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
            <Can
            role={auth0Client.getRole()}
            perform="admin:questions-answer"
            yes={() => (
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
                             )}
                             no={() => <Redirect to="/" />}
                           />
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
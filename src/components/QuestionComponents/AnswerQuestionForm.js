import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion } from '../../actions/question';
import QuestionButtonList from './QuestionButtonList';

/**
 * Form used to answer pending user questions. This form is available in the Answer Question page. 
 */
class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        //The form only requires to have an answer. 
        this.state = {
            answer: '',
            answerError: false
        };
    }

    //Change answer in local state.
    onAnswerChange = (e) => {
        e.preventDefault();
        const answer = e.target.value;
        this.setState(() => ({answer}));
    }

    //Submit question answer
    onSubmit = (e) => {
        e.preventDefault();
        //Generate error message indicator if there is no answer when submitting
        if(!this.state.answer){
            this.setState(() => ({answerError: true}));
        //Otherwise, clear the error message indicator.
        }else{
            this.setState(() => ({answerError: false}));
            this.props.dispatch(answerQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId, answer: this.state.answer}));
            //Move to the Pending Questions page upon completing the submission. 
            this.props.history.push('/staff/questions');
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2 text-center well">
                            <QuestionButtonList/>
                            </div>
                            <div className="col-sm-1"/>
                            <div className="col-sm-9 big-card item__body">
                            {
                                //Question
                            }
                            <h3> {this.props.lang === 'English' ? 'Question' : 'Pregunta'} </h3>
                                {this.props.question.question}
                            {
                                //Answer input field
                            }
                            <h3> {this.props.lang === 'English' ? 'Answer' : 'Respuesta'} </h3>
                                <textarea type="text" rows='10' className="form-control" required value={this.state.answer} placeholder="Write your answer here!" onChange={this.onAnswerChange}/>
                            {
                                //Message displayed when trying to submit an answer without filling the answer input field. 
                            }
                                {this.state.answerError}
                                <br/>
                                {this.state.answerError === true && 
                                    <div className="text-danger"  style={{marginBottom: '2.7rem'}}>
                                        {this.props.lang === 'English' ? <p>Please fill the 'Answer' field before submitting an answer.</p> : <p>Por favor, llene el campo de 'Respuesta' antes de guardar la respuesta.</p>}
                                    </div>
                                }
                                {
                                    //Button to submit an answer. 
                                }
                                <button onClick={this.onSubmit}>
                                    <div className="btn btn-item">
                                        {this.props.lang === 'English' ? 'Answer' : 'Responder'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

//Map current language state and information about question being answered to the component's properties. 
const mapStateToProps = (state, props) => {
    return{
        question: state.questions.find((question) => {
            return ((question.askedDate == props.match.params.askedDate) && (question.userId === props.match.params.userId));
        }),
        lang: state.language.lang
    };
};

//Connect the component to the controller. 
export default connect(mapStateToProps)(AnswerQuestionForm);
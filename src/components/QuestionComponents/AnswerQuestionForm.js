import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion, removeQuestion } from '../../actions/question';
import QuestionButtonList from './QuestionButtonList';
import { loadTeacherQuestion } from '../../actions/teacherQuestions';
import moment from 'moment';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { setSuccessModal } from '../../actions/successModal';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';
import {resetQuestionsList, loadQuestion} from '../../actions/question';

/**
 * Form used to answer pending user questions. This form is available in the Answer Question page. 
 */
class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        //The form only requires to have an answer. 
        this.state = {
            answer: '',
            answerError: false,
        };
    }

    //Unload questions in controller and load the question being answered when component mounts. 
    componentWillMount(){
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Unload questions
        this.props.dispatch(resetQuestionsList());    
        //Request list of questions pending answers   
        axios.get('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/staff/questions',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
        .then(response => {
            //Load question being answered into the controller
            response.data.questions.forEach(element => {
                this.props.dispatch(loadQuestion({question: element.question, askedDate: element.askeddate, 
                subject: element.subject, userId: element.userid}));
            });
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
        }).catch(error => {
            //Clear loding modal
            this.props.dispatch(setLoadingModal());
            //Set Failure modal if an error occurs. 
            this.props.dispatch(setFailureModal());
        });    
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
        }else if(this.state.answerError){
            this.setState(() => ({answerError: true}));
        }else{
            //Clear error
            this.setState(() => ({answerError: ''}));
            //Post answer to database. 
            axios.post('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/questions/answer', {
                askeddate: this.props.question.askedDate,
                answer: this.state.answer,
                teacherid: this.props.question.userId
            },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }}).then((response)=>{
                //Load answer to controller, set success modal and navigate to Pending Questions page if successful. 
                if(response.status == 201){
                    this.props.dispatch(answerQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId, answer: this.state.answer}));
                    this.props.dispatch(setSuccessModal());
                    this.props.history.push('/staff/questions');
                }
            }).catch(error => {
                //Set failure modal if unsuccessful
                this.props.dispatch(setFailureModal());
            });
            //Clear error
            this.setState(() => ({answerError: false}));
        }
    }

    render(){
        return (
            //Authenticate user information to grant access to Answer Question form. 
            <Can
            role={auth0Client.getRole()}
            perform="admin:questions-answer"
            yes={() => (
            <div className="background-home">
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                            {
                                //Navigation list for Questions pages. 
                            }
                                <div className="text-center well">
                                   <QuestionButtonList/>
                                </div>
                            </div>
                            <div className="col-sm-1"/>
                            <div className="col-sm-9">
                                <div className=" big-card item__body">
                                {
                                        //Subject
                                    }
                                    <div className="form__title">
                                        <p>{this.props.question ? this.props.question.subject : ''}</p>
                                    </div>
                                    {
                                        //Question
                                    }
                                    <h3> {this.props.lang === 'English' ? 'Question' : 'Pregunta'} </h3>
                                        {this.props.question ? this.props.question.question : ''}
                                    {
                                        //Answer input field
                                    }
                                    <h3> {this.props.lang === 'English' ? 'Answer' : 'Respuesta'} </h3>
                                    <span style={{color: 'gray', fontSize: '1.2rem'}}>{this.props.lang === 'English' ? 'Characters' : 'Caracteres'} {this.state.answer.length}/5000 </span>
                                    <br/>
                                    <textarea type="text" rows='10' className="form-control" maxLength="5000" value={this.state.answer} placeholder= {this.props.lang === 'English' ? 'Write your answer here!' : 'Escriba su respuesta aquí!'} onChange={this.onAnswerChange} onBlur={() => {
                                        this.setState(() => ({answer: this.state.answer.trim()}));
                                        //Verify that question answer does not only contain white space.
                                        if(this.state.answer && this.state.answer.match(/^\s+$/)){
                                            this.setState(() => ({answerError: true}));
                                        }else{
                                            this.setState(() => ({answerError: false}));
                                        }
                                    }}/>
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
                    </div>
                </form>
            </div>
                             )}
                             //Redirect user to login page if not authorized. 
                             no={() => <Redirect to="/login" />}
                           />
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
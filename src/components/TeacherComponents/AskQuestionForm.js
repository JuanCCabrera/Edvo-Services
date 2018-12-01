import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { setSuccessModal } from '../../actions/successModal';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';
import { reset,loadTeacherQuestionsAsked, loadTeacherRecentRecommendation, loadTeacherTopRecommendation, loadTeacherDaysInPlatform, loadTeacherRecommendationsRead } from '../../actions/teacherMetrics';
import {loadTeacherRecommendation, unloadTeacherRecommendations} from '../../actions/teacherRecommendations';
import {loadTeacherQuestion, unloadTeacherQuestions, addFavoriteQuestion} from '../../actions/teacherQuestions';

/**
 * Form available in the Teacher Home page which allows teachers to send questions to the Edvo Tech staff. 
 * Each question requires a subject and a question body. 
 */
class AskQuestionForm extends React.Component{
    constructor(props){
        super(props);
        //Each question must contain a subject and a question body. 
        this.state = {
            subject: '',
            subjectError: '',

            body: '',
            success: false,
            bodyError: '',
            askQuestionError: false,
            askQuestionPlan: false,
            askInvalidInputs: false,
            askQuestionAllowed: false
        };
    }

    //Changes subject in local state
    onSubjectChange = (e) => {
        const subject = e.target.value;
        this.setState(() => ({subject}));
    }

    //Changes question body in local state
    onBodyChange = (e) => {
        const body = e.target.value;
        this.setState(() => ({body}));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Change rendered error message if the language changes. 
            if(this.props.lang === 'English'){
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                }
                if(this.state.bodyError){
                    this.setState(() => ({bodyError: 'The question field must contain text.'}));
                }
            }else{
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'El campo del tema debe contener texto.'}))
                }
                if(this.state.bodyError){
                    this.setState(() => ({bodyError: 'El campo de la pregunta debe contener texto.'}))
                }
            }
        }
    }

    //Submits question information. 
    onSubmit = (e) => {
        //Prevent page refresh
        e.preventDefault();
        //Enable error message if there is a missing form field. 
        if(!this.state.subject || !this.state.body){
            this.setState(() => ({askQuestionError: true, success: false})); 
        }else if(this.state.subjectError || this.state.subjectError){
            this.setState(() => ({askQuestionError: true}))
        }else{
            axios.post('https://beta.edvotech.com/api/teacher/questions/ask', {
            subject: this.state.subject,
            question: this.state.body
            }, {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            })
            .catch(error => {
                if(error.response.status == 401){
                    this.setState(() => ({askInvalidInputs: true}))
                    this.setState(() => ({askQuestionError: false}));
                    this.setState(() => ({askQuestionPlan: false}));
                    this.setState(() => ({askQuestionAllowed: false}));
                }
                
                else if(error.response.status == 402){
                    this.setState(() => ({askQuestionPlan: true}))
                    this.setState(() => ({askQuestionAllowed: false}));
                    this.setState(() => ({askInvalidInputs: false}));
                    this.setState(() => ({askQuestionError: false}));
                }

                else if(error.response.status == 403){
                    this.setState(() => ({askQuestionAllowed: true}))
                    this.setState(() => ({askQuestionError: false}));
                    this.setState(() => ({askQuestionPlan: false}));
                    this.setState(() => ({askInvalidInputs: false}));
                }
            })
            .then((response)=>{
                if(response.status == 201){
                    this.setState(() => ({success: true, subject: '', body: ''}));
                    this.setState(() => ({askQuestionPlan: false}));
                    this.setState(() => ({askQuestionError: false}));
                    this.setState(() => ({askQuestionPlan: false}));
                    this.setState(() => ({askQuestionAllowed: false}));
                    this.setState(() => ({askInvalidInputs: false}));
                    if(!this.props.isInQuestionsPage){
                        this.props.dispatch(setSuccessModal());
                    }
                    if(this.props.isInQuestionsPage){
                        this.props.dispatch(setLoadingModal());
                        this.props.dispatch(unloadTeacherQuestions());
                        axios.get('https://beta.edvotech.com/api/teacher/questions',
                            {
                                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
                            .then(response => {
                                response.data.questions.forEach(element => {
                                    this.props.dispatch(loadTeacherQuestion({question: element.question, askedDate: element.askeddate, 
                                    subject: element.subject, favorite: element.favorite, userId: element.userid, answer: element.answer, rate: element.rate, read: element.read}));
                                    if(element.favorite == true){
                                        this.props.dispatch(addFavoriteQuestion({askedDate: element.askeddate}));
                                    }
                                });
                                this.props.dispatch(setLoadingModal());
                                this.props.dispatch(setSuccessModal());
                            }).catch(error => {
                                this.props.dispatch(setLoadingModal());
                                if(error.response.status >= 500){
                                    this.props.dispatch(setFailureModal());
                                }
                            });
                    }
                    
                    //Requerying Home
                    this.props.dispatch(reset());
                    this.props.dispatch(unloadTeacherRecommendations());
                    this.props.dispatch(setLoadingModal());

                    axios.get('https://beta.edvotech.com/api/teacher/home',
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                    })
                    .then(response => {
                        this.props.dispatch(loadTeacherDaysInPlatform({daysInPlatform: response.data.daysInPlatforms}));
                        this.props.dispatch(loadTeacherQuestionsAsked({questionsAsked: response.data.questionsasked}));
                        this.props.dispatch(loadTeacherRecommendationsRead({recommendationsRead: response.data.recommendationsRead}));
                        
                        response.data.recentRecommendations.forEach(element => {
                        this.props.dispatch(loadTeacherRecentRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rate: element.rate, read: element.read}));
                        this.props.dispatch(loadTeacherRecommendation({read: element.read, recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rate: element.rate}));
                        });
                        response.data.topRecommendations.forEach(element => {
                            this.props.dispatch(loadTeacherTopRecommendation({recoID: element.recomid, title: element.title, header: element.header, location: element.location, description: element.description, multimedia: element.multimedia, date: element.date, rate: element.rate, read: element.read}));
                            });
                        this.props.dispatch(setLoadingModal());
                    })
                    .catch(error =>{
                        this.props.dispatch(setLoadingModal());
                        this.props.dispatch(setFailureModal());
                    });
                } 
                
            });
    }
}
        
    render(){
        return(
            <div>
                <form onSubmit = {this.onSubmit}>
                {
                    //Subject input field
                }
                    <p>{this.props.lang === 'English' ? 'Subject' : 'Tema'}: </p>
                    <input
                    className="form-control"
                    type = "text"
                    placeholder = {this.props.lang === 'English' ? 'Subject' : 'Tema'}
                    value = {this.state.subject}
                    maxLength="100"
                    onChange = {this.onSubjectChange} onBlur={() => {
                        this.setState(() => ({subject: this.state.subject.trim()}));
                        if(this.state.subject && this.state.subject.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                            }else{
                                this.setState(() => ({subjectError: 'El campo del tema debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({subjectError: ''}));
                        }
                    }}/>
                    {
                        //Subject error
                    }
                    {this.state.subjectError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.subjectError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                {
                    //Question body input field
                }
                    <p>{this.props.lang === 'English' ? 'Question' : 'Pregunta'}: </p>
                    <span style={{color: 'gray', fontSize: '1.2rem'}}> {this.props.lang === 'English' ? 'Characters' : 'Caracteres'} {this.state.body.length}/5000 </span>
                    <br/>
                    <textarea
                    className="form-control"
                    type = "text"
                    placeholder = {this.props.lang === 'English' ? 'Write your question here.' : 'Escriba su pregunta en este espacio.'}
                    cols='41'
                    rows='6'
                    maxLength="5000"
                    value = {this.state.body}
                    onChange = {this.onBodyChange}
                    onBlur={() => {
                        this.setState(() => ({body: this.state.body.trim()}));
                        if(this.state.body && this.state.body.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({bodyError: 'The question field must contain text.'}));
                            }else{
                                this.setState(() => ({bodyError: 'El campo de la pregunta debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({bodyError: ''}));
                        }
                    }}
                    />

                    {
                        //Question body error
                    }
                    {this.state.bodyError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.bodyError}
                            </span>
                            <br/>
                        </div>}
                    <br/>


                    {
                        //Message displayed if an attempt is made to submit the form without filling all fields. 
                    }
                    {this.state.askQuestionPlan === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>You do not have an active subscription.</p> : <p>Usted no tiene una suscripción activa.</p>}
                        </div>
                    }
                    {this.state.askInvalidInputs === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>Invalid user or data.</p> : <p>Usuario o datos no validos.</p>}
                        </div>
                    }
                    {this.state.askQuestionAllowed === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>You are not allowed to perform this action</p> : <p>No tiene los permisos necesarios para realizar esta operación.</p>}
                        </div>
                    }
                    {this.state.askQuestionError === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>Please fill all fields text.</p> : <p>Por favor, llene todos los campos con texto.</p>}
                        </div>
                    }
                    
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div>
                                <button className="btn btn-item send_button" onClick={this.onSubmit}>
                                    <p>{this.props.lang === 'English' ? 'Ask' : 'Enviar'}</p></button>
                            </div>
                        </div>
                    </div>
                </form>
             </div>
        );
    }
}

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

//Connect component to controller
export default connect(mapStateToProps)(AskQuestionForm);

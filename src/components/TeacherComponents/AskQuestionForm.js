import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { setSuccessModal } from '../../actions/successModal';

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
            askQuestionError: false
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
        console.log(this.state);
        //Enable error message if there is a missing form field. 
        if(!this.state.subject || !this.state.body){
            this.setState(() => ({askQuestionError: true, success: false})); 
        }else{
            this.setState(() => ({askQuestionError: ''}));
            axios.post('http://142.93.250.246/api/teacher/questions/ask', {
            subject: this.state.subject,
            question: this.state.body,
            userid: '1'
    })
    .catch(error => {
        console.log("ERROR ASKING: ", error.message)
    })
    .then((response)=>{
        if(response.status == 201){
            this.setState(() => ({success: true, subject: '', body: ''}));
    
            this.setState(() => ({askQuestionError: true})); 
        }
        else if(this.state.subjectError || this.state.subjectError){
            this.setState(() => ({askQuestionError: true}))
        }else{
            this.setState(() => ({askQuestionError: false}));
            this.props.dispatch(setSuccessModal());
            this.props.onSubmit({
                subject: this.state.subject,
                body: this.state.body,
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
                    <span style={{color: 'gray', fontSize: '1.2rem'}}>{this.props.lang === 'English' ? 'Length' : 'Largo'}: {this.state.body.length}/5000</span>
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
                    {this.state.askQuestionError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                        </div>
                    }{this.state.success === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Your question was submitted successfully</p> : <p>Su pregunta ha sido enviada exitosamente.</p>}
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

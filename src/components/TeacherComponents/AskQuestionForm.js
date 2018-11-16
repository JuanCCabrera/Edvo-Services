import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';

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
            body: '',
            success: false,
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
            axios.post('http://localhost:3000/teacher/questions/ask', {
            subject: this.state.subject,
            question: this.state.body
    },{headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
    .then((response)=>{
        if(response.status == 201)
            this.setState(() => ({success: true, subject: '', body: ''}));
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
                    onChange = {this.onSubjectChange}/>
                    <br/>
                {
                    //Question body input field
                }
                    <p>{this.props.lang === 'English' ? 'Question' : 'Pregunta'}: </p>
                    <textarea
                    className="form-control"
                    type = "text"
                    placeholder = {this.props.lang === 'English' ? 'Write your question here.' : 'Escriba su pregunta en este espacio.'}
                    cols='41'
                    rows='6'
                    value = {this.state.body}
                    onChange = {this.onBodyChange}
                    />
                    {
                        //Message displayed if an attempt is made to submit the form without filling all fields. 
                    }
                    {this.state.askQuestionError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all fields before sending a question.</p> : <p>Por favor, llene todos los espacios en blanco antes de enviar una pregunta.</p>}
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

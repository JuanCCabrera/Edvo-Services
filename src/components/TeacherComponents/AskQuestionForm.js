import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';

class AskQuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            body: '',
            success: false,
            askQuestionError: false
        };
    }

    onSubjectChange = (e) => {
        const subject = e.target.value;
        this.setState(() => ({subject}));
    }

    onBodyChange = (e) => {
        const body = e.target.value;
        this.setState(() => ({body}));
    }

    onSubmit = (e) => {
        e.preventDefault();
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
                    <input
                    type = "text"
                    placeholder = "Subject"
                    value = {this.state.subject}
                    onChange = {this.onSubjectChange}/>
                    <br/>
                    <input
                    type = "textarea"
                    placeholder = "Insert your question here."
                    value = {this.state.body}
                    onChange = {this.onBodyChange}
                    />
                    <br/>
                    {this.state.askQuestionError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all empty fields before sending a question.</p> : <p>Por favor, llene todos los espacios vacios antes de enviar una pregunta.</p>}
                        </div>
                    }{this.state.success === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Your question was submitted successfully</p> : <p>Su pregunta ha sido enviada exitosamente.</p>}
                        </div>
                    }
                    <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Ask' : 'Enviar'}</button>
                </form>
             </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
} 

export default connect(mapStateToProps)(AskQuestionForm);

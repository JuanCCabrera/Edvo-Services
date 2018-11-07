import React from 'react';
import { connect } from 'react-redux';

class AskQuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            body: '',
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
            this.setState(() => ({askQuestionError: true})); 
        }else{
            this.setState(() => ({askQuestionError: ''}));
            axios.post('http://localhost:8081/teacher/ask', {
            subject: this.state.subject,
            body: this.state.body
    }).then((response)=>{
        if(response.status == 200)
            this.props.history.push('/admin/settings/users');
    });
            this.setState(() => ({askQuestionError: false}));
            this.props.onSubmit({
                subject: this.state.subject,
                body: this.state.body,
            });
            this.props.history.push('/teacher/home');
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

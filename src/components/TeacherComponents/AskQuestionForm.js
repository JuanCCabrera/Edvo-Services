import React from 'react';
import { connect } from 'react-redux';

class AskQuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            body: '',
            askQuestionError: '' 
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
            this.setState(() => ({askQuestionError: 'Please fill all blank fields'})); 
        }else{
            this.setState(() => ({askQuestionError: ''}));
            this.props.onSubmit({
                subject: this.state.subject,
                body: this.state.body,
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

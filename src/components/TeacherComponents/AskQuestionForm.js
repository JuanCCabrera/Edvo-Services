import React from 'react';
import { connect } from 'react-redux';

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
            this.setState(() => ({askQuestionError: true})); 
        //Otherwise, dispatch form data. 
        }else{
            this.setState(() => ({askQuestionError: false}));
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
                {
                    //Subject input field
                }
                    <input
                    type = "text"
                    placeholder = "Subject"
                    value = {this.state.subject}
                    onChange = {this.onSubjectChange}/>
                    <br/>
                {
                    //Question body input field
                }
                    <input
                    type = "textarea"
                    placeholder = "Insert your question here."
                    value = {this.state.body}
                    onChange = {this.onBodyChange}
                    />
                    <br/>
                    {
                        //Message displayed if an attempt is made to submit the form without filling all fields. 
                    }
                    {this.state.askQuestionError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all fields before sending a question.</p> : <p>Por favor, llene todos los espacios en blanco antes de enviar una pregunta.</p>}
                        </div>
                    }
                    <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Ask' : 'Enviar'}</button>
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

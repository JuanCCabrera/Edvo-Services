import React from 'react';
import { connect } from 'react-redux';
import {resetQuestionsList, removeQuestion} from '../../actions/question';
import {Link, withRouter, Router} from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setSuccessModal} from '../../actions/successModal';
import {setFailureModal} from '../../actions/failureModal';
import moment from 'moment';

/**
 * Single item in the Pending Questions list
 * @param {*} props - Pending question item information containing the following object model: 
    question_item: {
        question: '',
        askedDate: '',
        subject: '',
        userId: ''
    }
 */
class PendingQuestionsListItem  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toggleButton: false
        }
    }

    render(){
        return (
            <div className="item-card">
            {
                //Question subject
            }
                <p className="item__body card-title">{this.props.question.subject}</p>
            {
                //Question body
            }
                <p className="item__body card-text">{this.props.question.question}</p>

            {
                //Navigation link to the Answer Question page with a specific question identifier. 
            }
                <Link to={`/staff/questions/${this.props.question.askedDate}/${this.props.question.userId}`}>
                    <button>
                        <div className="btn btn-item">{this.props.lang === 'English' ? 'Answer' : 'Responder'}</div>
                    </button>
                </Link>
            {
                //Button to remove a question from the list of Pending Questions.
            }

            {this.state.toggleButton ? 
            
                <div>
                    <br/>
                    <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                        {this.props.lang === 'English' ? 'Are you sure you would like to remove this quesiton?' : '¿Estás seguro de que quieres remover esta pregunta?'}
                    </div>
                    <br/>
                    <button onClick={() => {    
                        axios.delete('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/questions/remove',{
                        data:{askeddate: this.props.question.askedDate,
                        userid: this.props.question.userId
                    },
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                        })
                        .then((response)=>{
                            if(response.status == 200){
                                this.props.dispatch(setSuccessModal());
                                this.props.dispatch(removeQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId}));
                            }
                        })
                        .catch(error => {
                            if(error.response.status == 401 || error.response.status == 403){
                                
                                this.props.dispatch(setFailureModal());
                            }
                        });    
                    }}>
                    <div className="btn btn-item" style={{marginTop: '10px'}}>
                            {this.props.lang === 'English' ? 'Yes' : 'Si'}
                    </div>
                    </button>
    
                    <button onClick={() => {
                        this.setState(() => ({toggleButton: false}));
                    }}>
                    <div className="btn btn-item" style={{marginTop: '10px'}}>
                            {this.props.lang === 'English' ? 'No' : 'No'}
                    </div>
                    </button>
                </div>
                :
                <div style={{display: 'inline-block'}}>
                <button onClick={() => {this.setState(() => ({toggleButton: true}))}}>
                    <div className="btn btn-item">
                        {this.props.lang === 'English' ? 'Remove' : 'Remover'}
                    </div>
                </button>
                </div>
                }
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

//Connect component to the controller. 
export default withRouter(connect(mapStateToProps)(PendingQuestionsListItem));



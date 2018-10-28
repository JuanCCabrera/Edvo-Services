import React from 'react';
import {connect} from 'react-redux';
import { answerQuestion } from '../../actions/question';

class AnswerQuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answer: ''
        };
    }

    onSubmit = (e) => {
        //TO-DO Add error checks
        e.preventDefault();
        this.props.dispatch(answerQuestion({askedDate: this.props.question.askedDate, userId: this.props.question.userId, answer: this.state.answer}));
    }

    render(){
        return (
            <div>
                <form onSubmit={onSubmit}>
                <RecommendationButtonList/>
                <h2> Edit Recommendation </h2>
                <CreateRecommendationForm 
                question={props.question}
                onSubmit={(recommendation) => {
                    props.dispatch(answerQuestion({askedDate, userId, answer}));
                    props.history.push('/staff/questions');
                }}/>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return{
        question: state.questions.find((question) => {
            return (question.askedDate === props.match.params.askedDate) && (question.userId === props.match.params.userId);
        })
    };
};

export default connect(mapStateToProps)(AnswerQuestionForm);
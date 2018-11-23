import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import { createQuiz, reset } from '../../actions/quiz';

class PendingQuizzesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 1
        }
    }
    

    componentWillMount(){        
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            this.props.dispatch(reset());
            console.log("REPSONSE OF QUIZ: ", response);
            let correctChoices = {}
            let questions = []
            let questionsObject = {
                questions: []
            }
            response.data.quizzes.forEach(element => {
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question,
                        recommendation: ''
                    }
                    questionObject.questionid = question.quizquestionid;
                    questionObject.recommendation = question.recommendationtitle
                    question.choices.forEach(choice => {
                        let choiceObject = {
                            choiceid: choice.choiceid,
                            choice: choice.choice
                        }
                        if(choice.correctanswer)
                            correctChoices[choice.quizquestionid] = choice.choiceid;
                        questionObject.choices.push(choiceObject);
                    })
                    questionsObject.questions.push(questionObject);
                })
                this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}))
                console.log("CORRECT ANSEWRS ARE: ", correctChoices);
                console.log("QUESTION OBJECT IS: ", questionsObject);
                });
        });
    }

    render(){
        return (
            <div>
                <h3>Pending Quizzes</h3>
                {console.log("PROPS?: ", this.props) }
                {this.props.quizzes.map((quiz) => {
                    return <PendingQuizzesListItem key={quiz} quiz={quiz}/>
                })}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        quizzes: state.quizzes
    }
};

export default connect(mapStateToProps)(PendingQuizzesList);



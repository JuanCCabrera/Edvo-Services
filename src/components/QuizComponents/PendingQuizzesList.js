import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import { createQuiz } from '../../actions/quiz';

class PendingQuizzesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 1
        }
    }
//this.props.dispatch(createQuiz({quizID: element.quizID, quizDate: element.quizDate, items: element.choices}));
            
    componentWillMount(){        
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            let correctChoices = {}
            let questions = []
            let questionsObject = {
                questions: []
            }
            response.data.quizzes.forEach(element => {
                console.log("QUIZZES: ", element);
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question
                    }
                    question.choices.forEach(choice => {
                        console.log("######CHOICE: ," ,choice);
                        let choiceObject = {
                            choiceid: choice.choiceid,
                            choice: choice.choice
                        }
                        if(choice.correctanswer)
                            correctChoices[choice.quizquestionid] = choice.choiceid;
                        questionObject.choices.push(choiceObject);
                        questionObject.questionid = question.quizquestionid;
                    })
                    questionsObject.questions.push(questionObject);
                })
                this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}))
                console.log("CORRECT ANSEWRS ARE: ", correctChoices);
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



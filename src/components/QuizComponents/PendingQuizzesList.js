import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';
import axios from 'axios';

class PendingQuizzesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 1
        }
        console.log("PROPS IN PENDEINGQUIZ: ", props);
    }

    componentWillMount(){        
        axios.get('http://localhost:8081/teacher/quizzes')
        .then(response => {
            response.data.forEach(element => {
                this.props.dispatch(createQuiz({quizID: element.quizID, quizDate: element.quizDate, items: element.questions}));
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



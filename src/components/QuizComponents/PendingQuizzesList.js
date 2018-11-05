import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';

class PendingQuizzesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 1
        }
        console.log("PROPS IN PENDEINGQUIZ: ", props);
    }

    render(){
        return (
            <div>
                <h3>Pending Quizzes</h3>
                {console.log("PROPS?: ", this.props) }
                {this.props.quizzes.map((quiz) => {
                    return <PendingQuizzesListItem key={uuid()} quiz={quiz}/>
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



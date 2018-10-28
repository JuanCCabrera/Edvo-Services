import React from 'react';
import { connect } from 'react-redux';
import PendingQuestionsListItem from './PendingQuestionsListItem';
import uuid from 'uuid';

class PendingQuestionsList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 1
        }
    }

    render(){
        return (
            <div>
                <h3>Pending Questions</h3>
                {this.props.questions.map((question) => {
                    return <PendingQuestionsListItem key={uuid()} question={question}/>
                })}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
};

export default connect(mapStateToProps)(PendingQuestionsList);



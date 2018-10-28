import React from 'react';
import { connect } from 'react-redux';
import {removeQuestion} from '../../actions/question';
import {Link} from 'react-router-dom';

const PendingQuestionsListItem = (props) => (
    <div>
        <h4>{props.question.subject}</h4>
        <h5>{props.question.question}</h5>
        <button onClick={() => {
            props.dispatch(removeQuestion({askedDate: props.question.askedDate, userId: props.question.userId}));
        }}>Remove</button>

        {/*}
            <Link to={`/recommendations/edit/${props.reco.id}`}><button>Edit</button></Link>
        */}
    </div>
);

export default connect()(PendingQuestionsListItem);



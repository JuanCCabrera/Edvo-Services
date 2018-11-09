import React from 'react';
import {connect} from 'react-redux';
import {setQuestionsTextFilter} from '../../actions/filterActions/questionsFilters';

class QuestionFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setQuestionsTextFilter(e.target.value));
                }}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.questionsFilters
    };
};

export default connect(mapStateToProps)(QuestionFilters);
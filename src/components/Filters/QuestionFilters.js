import React from 'react';
import {connect} from 'react-redux';
import {setQuestionsTextFilter} from '../../actions/filterActions/questionsFilters';

/**
 * Filter group which allows the filtering of pending questions by text
 */
class QuestionFilters extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="form-group">
                {
                    //Filter text input
                }
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setQuestionsTextFilter(e.target.value));
                }}/>
            </div>
        );
    }
}

//Map filter text data to component properties
const mapStateToProps = (state) => {
    return {
        filter: state.questionsFilters
    };
};

//Connect component to controller
export default connect(mapStateToProps)(QuestionFilters);
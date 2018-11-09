import React from 'react';
import {connect} from 'react-redux';
import {setTeacherQuestionsTextFilter, setTeacherQuestionsSorting} from '../../actions/filterActions/teacherQuestionsFilters';

class TeacherQuestionFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTeacherQuestionsTextFilter(e.target.value));
                }}/>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setTeacherQuestionsSorting(e.target.value));
                        }}>
                                <option className="btn-primary" value="" disabled="disabled">Sort By</option>

                                <option value="date">Date</option>

                                <option value="rate">Rating</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.teacherQuestionsFilters
    };
};

export default connect(mapStateToProps)(TeacherQuestionFilters);
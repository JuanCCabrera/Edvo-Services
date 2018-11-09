import React from 'react';
import {connect} from 'react-redux';
import {setTeacherRecommendationsTextFilter, setTeacherRecommendationsSortingFilter, setTeacherRecommendationsReadFilter} from '../../actions/filterActions/teacherRecommendationsFilters';

class TeacherRecommendationsFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTeacherRecommendationsTextFilter(e.target.value));
                }}/>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setTeacherRecommendationsSortingFilter(e.target.value));
                        }}>
                                <option className="btn-primary" value="date" disabled="disabled">Select Sorting Order</option>

                                <option value="date">Date</option>

                                <option value="rate">Rating</option>
                        </select>
                </div>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setTeacherRecommendationsReadFilter(e.target.value));
                        }}>
                                <option className="btn-primary" value="all" disabled="disabled">Choose Read Status</option>

                                <option value="all">All</option>

                                <option value="read">Read</option>

                                <option value="not_read">Unread</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.teacherRecommendationsFilters
    };
};

export default connect(mapStateToProps)(TeacherRecommendationsFilters);
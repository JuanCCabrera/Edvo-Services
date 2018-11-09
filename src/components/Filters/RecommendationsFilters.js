import React from 'react';
import {connect} from 'react-redux';
import {setRecommendationsTextFilter, setRecommendationsCategory} from '../../actions/filterActions/RecommendationsFilters';

class RecommendationsFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setRecommendationsTextFilter(e.target.value));
                }}/>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setRecommendationsCategory(e.target.value));
                        }}>
                                <option className="btn-primary" value="" disabled="disabled">Choose Category</option>

                                <option value="all">All</option>

                                <option value="Technology Integration">Technology Integration</option>

                                <option value="Updated Material">Updated Material</option>

                                <option value="Time Management">Time Management</option>

                                <option value="Teaching Strategies">Teaching Strategies</option>

                                <option value="Instructional Alignment">Instructional Alignment</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.recommendationsFilters
    };
};

export default connect(mapStateToProps)(RecommendationsFilters);
import React from 'react';
import {connect} from 'react-redux';
import {setUserTextFilter, setWeeklyCheck } from '../../actions/filterActions/userFilters';

class UserFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.userFilters.text} onChange={(e) => {
                    this.props.dispatch(setUserTextFilter(e.target.value));
                }}/>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setWeeklyCheck(e.target.value));
                        }}>
                                <option className="btn-primary" value="" disabled="disabled">Please Select a Filter</option>

                                <option value="all">All</option>

                                <option value="assigned">Have Weekly Recommendation</option>

                                <option value="not_assigned">Do Not Have Weekly Recommendation</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userFilters: state.userFilters
    };
};

export default connect(mapStateToProps)(UserFilters);
import React from 'react';
import {connect} from 'react-redux';
import {setSchoolsTextFilter} from '../../actions/filterActions/schoolFilters';

class InstitutionFilters extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setSchoolsTextFilter(e.target.value));
                }}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.schoolFilters
    };
};

export default connect(mapStateToProps)(InstitutionFilters);
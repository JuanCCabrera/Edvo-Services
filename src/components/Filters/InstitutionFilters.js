import React from 'react';
import {connect} from 'react-redux';
import {setSchoolsTextFilter} from '../../actions/filterActions/schoolFilters';

/**
 * Filter group which allows the filtering of schools by text. 
 */
class InstitutionFilters extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="form-group">
                {
                    //Filter text input field
                }
                <input className="form-control" type="text" placeholder={this.props.lang === 'English' ? 'Search' : 'Buscar'} value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setSchoolsTextFilter(e.target.value));
                }}/>
            </div>
        );
    }
}

//Map filter text data and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        filter: state.schoolFilters,
        lang: state.language.lang
    };
};

//Connect component to controller
export default connect(mapStateToProps)(InstitutionFilters);
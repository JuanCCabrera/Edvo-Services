import React from 'react';
import {connect} from 'react-redux';
import {setUserTextFilter, setWeeklyCheck } from '../../actions/filterActions/userFilters';

/**
 * Filter group which allows users to be filtered by text or their recommendation assignment status.
 */
class UserFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                {
                    //Text filter input field
                }
                
                <input className="form-control" type="text" placeholder={this.props.lang === 'English' ? 'Search' : 'Buscar'} value ={this.props.userFilters.text} onChange={(e) => {
                    this.props.dispatch(setUserTextFilter(e.target.value));
                }}/>

                {this.props.inAssignmentPage &&
                <br/>}
                
                {!this.props.inAssignmentPage && 
                <div>
                    <div className="btn-group">
                        <div className="dropdown">
                        {
                            //Filter Icon
                        }
                        <span className="btn btn-filter" style={{padding: '0.6rem'}}>
                                <i className="fas fa-filter"></i>
                        </span>
                            <div className="btn btn-default dropdown-toggle" style={{padding: '0.6rem'}}>
                                    {
                                        //Recommendation status filtering dropdown list
                                    }
                                    <select onChange={(e) => {
                                        this.props.dispatch(setWeeklyCheck(e.target.value));
                                    }}>
                                            <option className="btn-primary" value="" disabled="disabled">{this.props.lang === 'English' ? 'Select a status' : 'Selecciona un estado'}</option>

                                            <option value="all">{this.props.lang === 'English' ? 'All' : 'Todos'}</option>

                                            <option value="assigned">{this.props.lang === 'English' ? 'Have weekly recommendation' : 'Recibieron recomendación semanal'}</option>

                                            <option value="not_assigned">{this.props.lang === 'English' ? 'Do not have weekly recommendation' : 'No recibieron recomendación semanal'}</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

//Map user filters data and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        userFilters: state.userFilters,
        lang: state.language.lang
    };
};

//Connect component to controller. 
export default connect(mapStateToProps)(UserFilters);
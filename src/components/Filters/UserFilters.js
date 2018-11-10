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
                                <option className="btn-primary" value="" disabled="disabled">{this.props.lang === 'English' ? 'Select a Status' : 'Selecciona un Estatus'}</option>

                                <option value="all">{this.props.lang === 'English' ? 'All' : 'Todos'}</option>

                                <option value="assigned">{this.props.lang === 'English' ? 'Have Weekly Recommendation' : 'Recibieron Recomendación Semanal'}</option>

                                <option value="not_assigned">{this.props.lang === 'English' ? 'Do Not Have Weekly Recommendation' : 'No Recibieron Recomendación Semanal'}</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userFilters: state.userFilters,
        lang: state.language.lang
    };
};

export default connect(mapStateToProps)(UserFilters);
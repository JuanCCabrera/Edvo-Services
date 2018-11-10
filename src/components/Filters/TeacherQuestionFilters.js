import React from 'react';
import {connect} from 'react-redux';
import {setTeacherQuestionsTextFilter, setTeacherQuestionsSorting, setTeacherQuestionsReadFilter} from '../../actions/filterActions/teacherQuestionsFilters';

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
                            <option className="btn-primary" value="date" disabled="disabled">{this.props.lang === 'English' ? 'Sort By' : 'Ordene Por'}</option>

                            <option value="date">{this.props.lang === 'English' ? 'Date' : 'Fecha'}</option>

                            <option value="rate">{this.props.lang === 'English' ? 'Rating' : 'Clasificacion'}</option>
                        </select>
                </div>

                <div className="btn btn-default">
                        <select onChange={(e) => {
                            this.props.dispatch(setTeacherQuestionsReadFilter(e.target.value));
                        }}>
                                <option className="btn-primary" value="all" disabled="disabled">{this.props.lang === 'English' ? 'Choose a Recommendation Type' : 'Escoja un Tipo de Recomendación'} </option>

                                <option value="all">{this.props.lang === 'English' ? 'All' : 'Todas'}</option>

                                <option value="read">{this.props.lang === 'English' ? 'Read' : 'Leidas'}</option>

                                <option value="not_read">{this.props.lang === 'English' ? 'Unread' : 'No Leidas'}</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.teacherQuestionsFilters,
        lang: state.language.lang
    };
};

export default connect(mapStateToProps)(TeacherQuestionFilters);
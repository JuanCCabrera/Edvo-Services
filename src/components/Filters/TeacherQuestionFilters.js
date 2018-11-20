import React from 'react';
import {connect} from 'react-redux';
import {setTeacherQuestionsTextFilter, setTeacherQuestionsSorting, setTeacherQuestionsReadFilter} from '../../actions/filterActions/teacherQuestionsFilters';

/**
 * Filter group which allows teacher questions to be filtered by input text and read status, and allows sorting by date or rating. 
 */
class TeacherQuestionFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                {
                    //Text filter input field
                }
                <input className="form-control" type="text" placeholder={this.props.lang === 'English' ? 'Search' : 'Buscar'} value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTeacherQuestionsTextFilter(e.target.value));
                }}/>
                <div className="btn-group">
                    <span className="btn btn-filter" style={{marginBottom: '1rem'}}>
                        <i className="fas fa-filter"></i>
                    </span>

                    <div className="btn btn-default">
                            {
                                //Questions sorting type dropdown list (Date or Rating)
                            }
                            <select onChange={(e) => {
                                this.props.dispatch(setTeacherQuestionsSorting(e.target.value));
                            }}>
                                <option className="btn-primary" value="date" disabled="disabled">{this.props.lang === 'English' ? 'Sort By' : 'Ordene Por'}</option>

                                <option value="date">{this.props.lang === 'English' ? 'Date' : 'Fecha'}</option>

                                <option value="rate">{this.props.lang === 'English' ? 'Rating' : 'Clasificación'}</option>
                            </select>
                    </div>
                    <div className="btn btn-default">
                            {
                                //Questions read status filtering dropdown list (all, read, or not read)
                            }
                            <select onChange={(e) => {
                                this.props.dispatch(setTeacherQuestionsReadFilter(e.target.value));
                            }}>
                                    <option className="btn-primary" value="all" disabled="disabled">{this.props.lang === 'English' ? 'Choose a Question Type' : 'Escoja un Tipo de Pregunta'} </option>

                                    <option value="all">{this.props.lang === 'English' ? 'All' : 'Todas'}</option>

                                    <option value="read">{this.props.lang === 'English' ? 'Read' : 'Leídas'}</option>

                                    <option value="not_read">{this.props.lang === 'English' ? 'Unread' : 'No Leídas'}</option>
                            </select>
                    </div>
                </div>
            </div>
        );
    }
}

//Map teacher questions filters data and current language state to component. 
const mapStateToProps = (state) => {
    return {
        filter: state.teacherQuestionsFilters,
        lang: state.language.lang
    };
};

//Connect component to controller. 
export default connect(mapStateToProps)(TeacherQuestionFilters);
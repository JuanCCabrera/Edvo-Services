import React from 'react';
import {connect} from 'react-redux';
import {setTeacherRecommendationsTextFilter, setTeacherRecommendationsSortingFilter, setTeacherRecommendationsReadFilter} from '../../actions/filterActions/teacherRecommendationsFilters';

/**
 * Filter group which allows the teacher recommendations to be filtered by text and read status, and allows them to be sorted by date or rating. 
 */
class TeacherRecommendationsFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                {
                    //Text filter input field
                }
                <input className="form-control" type="text" placeholder="Search" value ={this.props.filter.text} onChange={(e) => {
                    this.props.dispatch(setTeacherRecommendationsTextFilter(e.target.value));
                }}/>

                <div className="btn-group">
                    `<span className="btn btn-filter" style={{marginBottom: '1rem'}}>
                            <i className="fas fa-filter"></i>
                    </span>
                    <div className="btn btn-default">
                            {
                                //Recommendations sorting type dropdown list (Date or Rating)
                            }
                            <select onChange={(e) => {
                                this.props.dispatch(setTeacherRecommendationsSortingFilter(e.target.value));
                            }}>
                                    <option className="btn-primary" value="date" disabled="disabled">{this.props.lang === 'English' ? 'Sort By' : 'Ordene Por'}</option>

                                    <option value="date">{this.props.lang === 'English' ? 'Date' : 'Fecha'}</option>

                                    <option value="rate">{this.props.lang === 'English' ? 'Rating' : 'Clasificación'}</option>
                            </select>
                    </div>

                    <div className="btn btn-default">
                            {
                                //Recommendations read status filtering dropdown list (all, read, not read)
                            }
                            <select onChange={(e) => {
                                this.props.dispatch(setTeacherRecommendationsReadFilter(e.target.value));
                            }}>
                                    <option className="btn-primary" value="all" disabled="disabled">{this.props.lang === 'English' ? 'Choose a Recommendation Type' : 'Escoja un Tipo de Recomendación'} </option>

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

//Map teacher recommendations filters data and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        filter: state.teacherRecommendationsFilters,
        lang: state.language.lang
    };
};

//Connect component to controller
export default connect(mapStateToProps)(TeacherRecommendationsFilters);
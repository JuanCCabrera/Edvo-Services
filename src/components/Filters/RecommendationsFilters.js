import React from 'react';
import {connect} from 'react-redux';
import {setRecommendationsTextFilter, setRecommendationsCategory} from '../../actions/filterActions/RecommendationsFilters';

/**
 * Filter group which allows recommendations to be filtered by text and category. 
 */
class RecommendationsFilters extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-sm-10">
                        {
                            //Text filter input field
                        }
                        <div>
                            <input className="form-control" type="text" placeholder={this.props.lang === 'English' ? 'Search' : 'Buscar'} value ={this.props.filter.text} onChange={(e) => {
                                this.props.dispatch(setRecommendationsTextFilter(e.target.value));
                            }}/>
                        </div>
                    </div>
                </div>

                <div className="btn-group">
                {
                    //Filter icon
                }
                    <span className="btn btn-filter" style={{marginBottom: '1rem'}}>
                                <i className="fas fa-filter"></i>
                    </span>
                    <div className="btn btn-default">
                            {
                                //Category filter dropdown list
                            }
                            <select onChange={(e) => {
                                this.props.dispatch(setRecommendationsCategory(e.target.value));
                            }}>
                                    <option className="btn-primary" value="" disabled="disabled">{this.props.lang === 'English' ? 'Choose a Category' : 'Seleccione una Categoría'}</option>

                                    <option value="all">{this.props.lang === 'English' ? 'All' : 'Todas'}</option>

                                    <option value="Technology Integration">{this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnología'}</option>

                                    <option value="Updated Material">{this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado' }</option>

                                    <option value="Time Management">{this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'}</option>

                                    <option value="Teaching Strategies">{this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Educación'}</option>

                                    <option value="Instructional Alignment">{this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineación Curricular'}</option>
                            </select>
                    </div>
                </div>
            </div>
        );
    }
}

//Map recommendations filters data and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        filter: state.recommendationsFilters,
        lang: state.language.lang
    };
};

//Connect component to controller. 
export default connect(mapStateToProps)(RecommendationsFilters);
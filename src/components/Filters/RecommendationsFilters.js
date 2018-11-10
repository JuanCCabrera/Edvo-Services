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
                                <option className="btn-primary" value="" disabled="disabled">{this.props.lang === 'English' ? 'Choose Category' : 'Seleccionar Categorías'}</option>

                                <option value="all">{this.props.lang === 'English' ? 'All' : 'Todas'}</option>

                                <option value="Technology Integration">{this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnología'}</option>

                                <option value="Updated Material">{this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado' }</option>

                                <option value="Time Management">{this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'}</option>

                                <option value="Teaching Strategies">{this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Educación'}</option>

                                <option value="Instructional Alignment">{this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineamiento de Instrucción'}</option>
                        </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.recommendationsFilters,
        lang: state.language.lang
    };
};

export default connect(mapStateToProps)(RecommendationsFilters);
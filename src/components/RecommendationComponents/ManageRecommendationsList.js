import React from 'react';
import {connect} from 'react-redux';
import ManageRecommendationsListItem from './ManageRecommendationsListItem';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';

class ManageRecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }

    componentWillMount(){
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const displayedRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: displayedRecommendations});
    }

    componentDidUpdate(prevProps){
        if(prevProps.recommendation !== this.props.recommendation){
            if(this.state.displayedRecommendations.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }
    }

    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        if(((pageNumber)*this.itemsPerPage) > this.props.recommendation.length){
            endIndex = this.props.recommendation.length;
        }
        const displayedRecommendations = this.props.recommendation.slice(startIndex, endIndex);
        this.setState(() => ({activePage: pageNumber, displayedRecommendations: displayedRecommendations}));
    };

    render(){
        return(
            <div>
                <h3>{this.props.lang === 'English' ? 'Recommendations' : 'Recomendaciones'}</h3>
                {this.state.displayedRecommendations.map((reco) => {
                    return <ManageRecommendationsListItem key={reco.id} reco={reco}/>
                })}
                <br/>

                {(this.props.recommendation.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.recommendation.length}
                    onChange={this.handlePageChange}
                    />
                }
                {(this.props.recommendation.length === 0) &&
                    (this.props.lang === 'English' ?
                    <div>
                        <p>There are no available recommendations to manage.</p>
                        <Link to='/recommendations/create'><button>Create New Recommendation</button></Link>
                    </div> : 
                    <div>
                        <p>No hay recomendaciones disponibles para administrar.</p>
                        <Link to='/recommendations/create'><button>Crear Nueva Recomendación</button></Link>
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        recommendation: state.recommendations,
        assigned: state.assignRecommendation,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ManageRecommendationsList);
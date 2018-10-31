import React from 'react';
import {connect} from 'react-redux';
import ManageRecommendationsListItem from './ManageRecommendationsListItem';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';

class ManageRecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5;
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }

    componentWillMount(){
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        const displayedRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: displayedRecommendations});
    }

    handlePageChange = (pageNumber) => {
        console.log(pageNumber);
        console.log(this.props.recommendation.length);
        const startIndex = (pageNumber-1)*this.itemsPerPage;
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
                <h3>Recommendations</h3>
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
                    <div>
                        <p>There are no available recommendations to manage.</p>
                        <Link to='/recommendations/create'><button>Create New Recommendation</button></Link>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        recommendation: state.recommendations,
        assigned: state.assignRecommendation
    }
}

export default connect(mapStateToProps)(ManageRecommendationsList);
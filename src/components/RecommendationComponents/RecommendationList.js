import React from 'react';
import {connect} from 'react-redux';
import RecommendationListItem from './RecommendationListItem';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';

class RecommendationsList extends React.Component{
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
        const initialPageRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: initialPageRecommendations});
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
                <h3>Recommendations</h3>
                {this.state.displayedRecommendations.map((reco) => {
                    return <RecommendationListItem key={reco.id} reco={reco} selectedRecommendation={this.props.assigned.recoID}/>
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
                        <p>There are no available recommendations for assignment. Please create a new recommendation to assign.</p>
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

export default connect(mapStateToProps)(RecommendationsList);
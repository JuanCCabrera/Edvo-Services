import React from 'react';
import {connect} from 'react-redux';
import ManageRecommendationsListItem from './ManageRecommendationsListItem';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import getVisibleRecommendations from '../../selectors/recommendations';
import axios from 'axios';
import auth0Client from '../../Auth';
import { loadRecommendation, unloadRecommendations } from '../../actions/recommendations';

/**
 * List of recommendations which can be edited or removed from the system. 
 */
class ManageRecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.pageSlice = 1;
        this.itemsPerPage = 5;  //Number of recommendations per page
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }
    componentWillUnmount(){
        console.log("I INMOUNTED EVERYTHING");
        this.props.dispatch(unloadRecommendations());
    }

    //Configure initial state if component will be mounted. 
    //Determine the recommendations to display on the first page. 
    componentWillMount(){
        axios.get('http://localhost:3000/admin/recommendations',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            console.log("REPSONSE RECOM:L ", response);
            response.data.recommendations.forEach(element => {
                //Change id for userID when DB connection is ready
                this.props.dispatch(loadRecommendation({id: element.recomid, title: element.title,
                    header: element.header, multimedia: element.multimedia, 
                    description: element.description}));
            });
        });
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const displayedRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: displayedRecommendations});
    }

    //Update page when component updates
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items left in the current page. 
        if(prevProps.recommendation !== this.props.recommendation){
            if(this.state.displayedRecommendations.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        //Move to first page if filters are modified. 
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    
    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit amount of items displayed on last page based on length of the original array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.recommendation.length){
            endIndex = this.props.recommendation.length;
        }
        //Slice original array to obtain list of items to display
        const displayedRecommendations = this.props.recommendation.slice(startIndex, endIndex);
        //Modify local state
        this.setState(() => ({activePage: pageNumber, displayedRecommendations: displayedRecommendations}));
    };

    render(){
        return(
            <div>
            {
                //Recommendations list
            }
                {this.state.displayedRecommendations.map((reco) => {
                    return <ManageRecommendationsListItem key={reco.id} reco={reco}/>
                })}
                <br/>

            {
                //Pagination component
            }
            <div className="text-center">
                {(this.props.recommendation.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.recommendation.length}
                    onChange={this.handlePageChange}
                    />
                }
            </div>

            {
                //Message displayed if there are no recommendations in the Recommendations List. 
                //This includes a link to create a new recommendation. 
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

//Map filtered recommendations, recommendations filters data, recommendation assignment data and the current language state to the component's properties. 
const mapStateToProps = (state) => {
    return{
        recommendation: getVisibleRecommendations(state.recommendations, state.recommendationsFilters),
        filters: state.recommendationsFilters,
        assigned: state.assignRecommendation,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(ManageRecommendationsList);
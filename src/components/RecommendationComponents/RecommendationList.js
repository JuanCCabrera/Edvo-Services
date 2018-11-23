import React from 'react';
import {connect} from 'react-redux';
import RecommendationListItem from './RecommendationListItem';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import getVisibleRecommendations from '../../selectors/recommendations';
import {loadRecommendation, unloadRecommendations} from '../../actions/recommendations';
import axios from 'axios';
import auth0Client from '../../Auth';

/**
 * List of recommendations displayed in the Assign Recommendations and Manage Recommendations pages. 
 */
class RecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Number of recommendations on list
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }

    //Configure local state when component will mount. This involves selecting which recommendations will be displayed on the first page
    //when the component loads. 
    componentWillMount(){
        console.log("MOUTING RECOMLIST WITH ID: ", this.props.assigned.userID);
        axios.get('https://beta.edvotech.com/api/admin/user/recommendations',{
            
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` },
            
            params: {
                userToAssign: this.props.assigned.userID
              }
          })
        .then(response => {
            console.log("REPSONSE RECOM:L ", response);
            response.data.recommendations.forEach(element => {
                //Change id for userID when DB connection is ready
                this.props.dispatch(loadRecommendation({id: element.recomid, title: element.title,
                    header: element.header, multimedia: element.multimedia, 
                    description: element.description}));
            })
            .catch(error =>{
                console.log("ERROR ASSINING: ", error);
            });
        });
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: initialPageRecommendations});
    }

    componentWillUnmount(){
        this.props.dispatch(unloadRecommendations());
    }
    //Update page when the component updates
    componentDidUpdate(prevProps){
        //If there are no more elements in the page, then go to the previous page. 
        if(prevProps.recommendation !== this.props.recommendation){
            if(this.state.displayedRecommendations.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        //Change to first page whenever a filter is modified. 
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
                //Recommendations List
            }
                {this.state.displayedRecommendations.map((reco) => {
                    return <RecommendationListItem key={reco.id} reco={reco} selectedRecommendation={this.props.assigned.recoID}/>
                })}
                <br/>
            <div className="text-center">
            {
                //Pagination component
            }
                {(this.props.recommendation.length > 5) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.recommendation.length}
                    onChange={this.handlePageChange}
                    />
                }
            </div>
            {
                //Message displayed when there are no elements in the Recommendations page. It includes a link to create a new recommendation. 
            }
                {(this.props.recommendation.length === 0) && (this.props.lang === 'English' ?
                    <div>
                        <p>There are no available recommendations for assignment. Please create a new recommendation to assign.</p>
                        <Link to='/recommendations/create'><button>Create New Recommendation</button></Link>
                    </div>
                    :
                    <div>
                        <p>No hay recomendaciones disponibles para asignar. Si desea asignar una recomendación al usuario seleccionado, cree una recomendación nueva para asignar.</p>
                        <Link to='/recommendations/create'><button>Crear Nueva Recomendación</button></Link>
                    </div>
                )}
            </div>
        )
    }
}

//Map filtered recommendations, recommendations filters data, recommendaiton assignment data and the current language state to the component's properties. 
const mapStateToProps = (state) => {
    return{
        recommendation: getVisibleRecommendations(state.recommendations, state.recommendationsFilters),
        filters: state.recommendationsFilters,
        assigned: state.assignRecommendation,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(RecommendationsList);
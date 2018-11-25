import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import TeacherRecommendationsListItem from './TeacherRecommendationsListItem';

/**
 * List of recommendations marked as favorites. This list is available in the Teacher Recommendations page. 
 */
class FavoriteRecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 3;  //Number of favorite recommendations shown per page.
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }

    //Configure local state when component will be loaded. This sets the initial list displayed on the first page. 
    componentWillMount(){
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: initialPageRecommendations});
    }

    //Modify list on component update. 
    componentDidUpdate(prevProps){
        //If list has been modified...
        if(prevProps.recommendation !== this.props.recommendation){
            //If there are no recommendations displayed on the current page...
            if(this.state.displayedRecommendations.length === 1 && this.currentPage !== 1){
                //Go to the previous page
                this.handlePageChange(this.currentPage-1);
            }else{
                //Refresh the current page
                this.handlePageChange(this.currentPage);
            }
        }
    }

    //Change list page and display new list items. 
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit items displayed on last page based on the length of the full list of elements. 
        if(((pageNumber)*this.itemsPerPage) > this.props.recommendation.length){
            endIndex = this.props.recommendation.length;
        }
        //Slice original list of favorite recommendations to obtain the list corresponding to the current page. 
        const displayedRecommendations = this.props.recommendation.slice(startIndex, endIndex);
        //Set the new list in the local state. 
        this.setState(() => ({activePage: pageNumber, displayedRecommendations: displayedRecommendations}));
    };

    render(){
        return(
            <div>
            {
                //Items of the favorite recommendations list. 
            }
                {this.state.displayedRecommendations.map((reco) => {
                    return <TeacherRecommendationsListItem key={reco.recoID} reco={reco}/>
                })}
                <br/>

                {
                    //Pagination component
                }
                <div className="text-center">
                {(this.props.recommendation.length > 3) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.recommendation.length}
                    onChange={this.handlePageChange}
                    />
                }
                </div>
                {
                    //Display message if there are no recommendations in the list. 
                }
               
                {(this.props.recommendation.length === 0) && (this.props.lang === 'English' ?
                    <div className="empty-message-card">
                        <p>You do not have favorite recommendations.</p>
                    </div>
                    :
                    <div className="empty-message-card">
                        <p>Usted no tiene recomendaciones favoritas.</p>
                    </div>
                )}
                
            </div>
        )
    }
}

//Map recommendations marked as favorites and current language state to component properties. 
const mapStateToProps = (state) => {
    return{
        recommendation: state.teacherRecommendations.favoriteRecommendations,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(FavoriteRecommendationsList);
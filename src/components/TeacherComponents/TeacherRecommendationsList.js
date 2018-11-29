import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import TeacherRecommendationsListItem from './TeacherRecommendationsListItem';
import { addFavoriteRecommendation, loadTeacherRecommendation, unloadTeacherRecommendations } from '../../actions/teacherRecommendations';
import axios from 'axios';
import auth0Client from '../../Auth';
import getVisibleTeacherRecommendations from '../../selectors/teacherRecommendations';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';
/**
 * List of recommendations assigned to the Teacher. This list is available in the Teacher Recommendations page. 
 */
class TeacherRecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Number of recommendations per list page. 
        this.currentPage = 1;  //Current page
        this.state = {
            activePage: 1,
            displayedRecommendations: []
        }
    }

    componentWillUnmount(){
        this.props.dispatch(unloadTeacherRecommendations());
    }

    //Configure local state when component will be loaded. This sets the initial list displayed on the first page. 
    componentWillMount(){
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/teacher/recommendations',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            response.data.recommendations.forEach(element => {        
                this.props.dispatch(loadTeacherRecommendation({recoID: element.recomid, title: element.title, 
                header: element.header, location: element.location, 
                description: element.description, 
                multimedia: element.multimedia, date: element.date, read: !!element.read, rate: element.rate}));
                if(element.favorite == true){
                    this.props.dispatch(addFavoriteRecommendation({recoID: element.recomid, title: element.title, 
                        header: element.header, location: element.location, 
                        description: element.description, 
                        multimedia: element.multimedia, date: element.date, read: element.read, rate: element.rate}));
                }
         });
         this.props.dispatch(setLoadingModal());
    }).catch(error => {
        this.props.dispatch(setLoadingModal());
        this.props.dispatch(setFailureModal());
        
    });
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: initialPageRecommendations});
    }
    
    //Modify list on component update
    componentDidUpdate(prevProps){
        //If component was modified...
        if(prevProps.recommendation !== this.props.recommendation){
            //If there are no recommendations displayed in the current page...
            if(this.state.displayedRecommendations.length === 0 && this.currentPage !== 1){
                //Move to previous page
                this.handlePageChange(this.currentPage-1);
            }else{
                //Refresh current page
                this.handlePageChange(this.currentPage);
            }
        }

        //Move to first page if filters are modified
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    //Change list page and show new list items
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit items displayed on last page based on the length of the full list of elements. 
        if(((pageNumber)*this.itemsPerPage) > this.props.recommendation.length){
            endIndex = this.props.recommendation.length;
        }
        //Slice original list of questions to obtain the list corresponding to the current page. 
        const displayedRecommendations = this.props.recommendation.slice(startIndex, endIndex);
        //Set new list in local state
        this.setState(() => ({activePage: pageNumber, displayedRecommendations: displayedRecommendations}));
    };

    render(){
        return(
            <div>
            {
                //Items of the Teacher Recommendations list. 
            }
            <div className="list-group">
                    {this.state.displayedRecommendations.map((reco) => {
                        return <TeacherRecommendationsListItem key={reco.recoID} reco={reco}/>
                    })}
                    <br/>
            </div>

            {
                //Pagination component
            }
            <div className="text-center">
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
                    //Message displayed if there are no items on the list. 
                }
                
                    {(this.props.recommendation.length === 0) && (this.props.lang === 'English' ?
                        <div className="empty-message-card">
                            <p>You do not have any assigned recommendations.</p>
                        </div>
                        :
                        <div className="empty-message-card">
                            <p>Usted no tiene recomendaciones asignadas.</p>
                        </div>
                    )}
            </div>
        )
    }
}

//Map filtered list of recommendations, teacher recommendations filter data and the current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        recommendation: getVisibleTeacherRecommendations(state.teacherRecommendations.recommendations, state.teacherRecommendationsFilters),
        filters: state.teacherRecommendationsFilters,
        lang: state.language.lang
    }
}

//Connect the component to the controller. 
export default connect(mapStateToProps)(TeacherRecommendationsList);
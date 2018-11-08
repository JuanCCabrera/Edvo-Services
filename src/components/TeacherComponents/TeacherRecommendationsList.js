import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import TeacherRecommendationsListItem from './TeacherRecommendationsListItem';
import { loadTeacherRecommendation } from '../../actions/teacherRecommendations';
import axios from 'axios';

class TeacherRecommendationsList extends React.Component{
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
        axios.get('http://localhost:8081/teacher/recommendations')
        .then(response => {
            response.data.forEach(element => {            
                this.props.dispatch(loadTeacherRecommendation({recoID: element.data.recoID, title: element.data.title, 
                header: element.data.header, location: element.data.location, 
                description: element.data.description, 
                multimedia: element.data.multimedia, date: element.data.date, read: element.data.read, rating: element.data.rating}));

                if(element.data.favorite)
                    this.props.dispatch(loadTeacherFavoriteRecommendation({recoID: element.data.recoID, title: element.data.title, 
                        header: element.data.header, location: element.data.location, 
                        description: element.data.description, 
                        multimedia: element.data.multimedia, date: element.data.date, read: element.data.read, rating: element.data.rating}));
        });
        this.pageSlice = Math.ceil(this.props.recommendation.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageRecommendations = this.props.recommendation.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedRecommendations: initialPageRecommendations});
    })}

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
                {this.state.displayedRecommendations.map((reco) => {
                    return <TeacherRecommendationsListItem key={reco.recoID} reco={reco}/>
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
                {(this.props.recommendation.length === 0) && (this.props.lang === 'English' ?
                    <div>
                        <p>There are no available recommendations.</p>
                    </div>
                    :
                    <div>
                        <p>No hay recomendaciones disponibles.</p>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        recommendation: state.teacherRecommendations.recommendations,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherRecommendationsList);
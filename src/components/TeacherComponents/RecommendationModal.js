import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import {rateRecommendation} from '../../actions/teacherRecommendations';
import {addFavoriteRecommendation} from '../../actions/teacherRecommendations';
import {removeFavoriteRecommendation} from '../../actions/teacherRecommendations';
import axios from 'axios';
import auth0Client from '../../Auth';
import {rateTopAndMostRecent} from '../../actions/teacherMetrics';

/**
 * Modal displayed when a recommendation is selected. The modal displays information about the recommendation including the recommendation's
 * title, favorite status, header, description, location, date of assignment and rating.   
 * @param {*} props - Default properties, current language state, selected question information and teacher question filtering data.
 */
class RecommendationModal extends React.Component{
    constructor(props){
        super(props);
    }
        
    render(){
        return (
            <Modal
    isOpen = {this.props.recommendation.recoID !== ''}
    onRequestClose = {this.props.clearSelectedRecommendation}
    contentLabel="Recommendation"
    >
    <div className="container">
        <div className="row">
        {            
            console.log("RECOMMEDNTAION MODAL: ", this.props)
        }
            <div className="col-lg-10 text-left">
                <h2>{this.props.recommendation.title}</h2>
            </div>
        {
            //Favorite status
        }
            <div className="col-lg-1">
                <h3>{this.props.lang === 'English' ? 'Favorite' : 'Favorita'}: </h3>
            </div>
        {
            //Favorite star
        }
            <div className="col-lg-1">
            <StarRatingComponent
                name="favorite"
                starCount={1}
                value={this.props.isFavorite}
                onStarClick = {(nextValue, prevValue, name) => {
                    let favorite = false
                    if(prevValue == 0)
                        favorite = true
                    console.log("IM CLICKING TO FAVPREV: ", prevValue);
                    console.log("IM CLICKING TO FAVBNEXT: ", nextValue);
                    axios.post('http://localhost:3000/teacher/recommendations/favorite',{
                        recomid: this.props.recommendation.recoID,
                        favorite: favorite
                    },{
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                    }).then(response =>{
                    if(prevValue == 0){
                        //Add to favorites list 
                        console.log("IM FAVORITIN: ", this.props.recommendation);
                        this.props.dispatch(addFavoriteRecommendation(this.props.recommendation));
                    }else{
                        //Remove from favorites list through filter
                        this.props.dispatch(removeFavoriteRecommendation({recoID: this.props.recommendation.recoID}));
                    }});
                }}
            />
            </div>
        </div>
    </div>
        <div>
        {
            //Header
        }
            <h4 className="font-weight-bold">{this.props.recommendation.header}</h4>
            {
                //TO-DO: INSERT VIDEO CONTENT props.recommendation.multimedia (Daniel)
            }
        {
            //Description
        }
        <div dangerouslySetInnerHTML={{ __html: this.props.recommendation.description}} />
        {
            //Location
        }
            <h4>{this.props.recommendation.location}</h4>
        {
            //Date of assignment
        }
            <h4>{this.props.lang === 'English' ? 'Date: ' : 'Fecha: '}{this.props.recommendation.date}</h4>
        {
            //Rating
        }
            <h4>{this.props.lang === 'English' ? 'Rate: ': 'Clasificar: '}</h4>
        </div>
        {
            //Rating star system
        }
        <StarRatingComponent
            name="rate"
            starCount={5}
            value={this.props.recommendation.rate}
            onStarClick={(nextValue, prevValue, name) => {
                axios.post('http://localhost:3000/teacher/recommendations/rate',{
                    recomid: this.props.recommendation.recoID,
                    rate: nextValue
                },{
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                }).then(response =>{
                    this.props.dispatch(rateRecommendation({recoID: this.props.recommendation.recoID, rate: nextValue}));
                    this.props.dispatch(rateTopAndMostRecent({recoID: this.props.recommendation.recoID, rate: nextValue}));
                })}}
        />

        <br/>
        {
            //Button to close modal
        }
        <div className="btn btn-primary">
            <button onClick = {this.props.clearSelectedRecommendation}>{this.props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
        </div>
    </Modal>
        );
    }
}

//Map value indicating favorite status, selected recommendation information and current language state to component properties. 
const mapStateToProps = (state) => {
    let val = 0;
    if(state.teacherRecommendations.selectedRecommendation.isFavorite){
        var found = state.teacherRecommendations.selectedRecommendation.isFavorite.find((isFav) => {
            return isFav === 1;
        });
        if(found === 1){
            val = found;
        }else{
            val = 0;
        }
    }
    return {
        isFavorite: val,
        recommendation: state.teacherRecommendations.selectedRecommendation,
        lang: state.language.lang,
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(RecommendationModal);
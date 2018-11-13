import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import {rateRecommendation} from '../../actions/teacherRecommendations';
import {addFavoriteRecommendation} from '../../actions/teacherRecommendations';
import {removeFavoriteRecommendation} from '../../actions/teacherRecommendations';
import axios from 'axios';
import auth0Client from '../../Auth';

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
            <div className="col-lg-10 text-left">
                <h2>{this.props.recommendation.title}</h2>
            </div>
            <div className="col-lg-1">
            <h3>{this.props.lang === 'English' ? 'Favorite' : 'Favorita'}: </h3>
            </div>
            <div className="col-lg-1">
            <StarRatingComponent
                name="favorite"
                starCount={1}
                value={this.props.isFavorite}
                onStarClick = {(nextValue, prevValue, name) => {
                    if(prevValue === 0){
                        //Add to favorites list 
                        this.props.dispatch(addFavoriteRecommendation(this.props.recommendation));
                    }else{
                        //Remove from favorites list through filter
                        this.props.dispatch(removeFavoriteRecommendation({recoID: this.props.recommendation.recoID}));
                    }
                }}
            />
            </div>
        </div>
    </div>
        <div>
            <h4 className="font-weight-bold">{this.props.recommendation.header}</h4>
            {
                //TO-DO: INSERT VIDEO CONTENT props.recommendation.multimedia
            }
            <p>{this.props.recommendation.description}</p>
            <h4>{this.props.recommendation.location}</h4>
            <h4>{this.props.lang === 'English' ? 'Date: ' : 'Fecha: '}{this.props.recommendation.date}</h4>
            <h4>{this.props.lang === 'English' ? 'Rate: ': 'Clasificar: '}</h4>
        </div>
        {console.log("RECOM RATE IS: ", this.props.recommendation.rate)}
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
                })}}
        />

        <br/>
        <div className="btn btn-primary">
            <button onClick = {this.props.clearSelectedRecommendation}>{this.props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
        </div>
    </Modal>
        );
    }
}

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

export default connect(mapStateToProps)(RecommendationModal);
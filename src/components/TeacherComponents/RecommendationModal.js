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
import moment from 'moment';

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
            <div className="">
                <Modal
                isOpen = {this.props.recommendation.recoID !== ''}
                onRequestClose = {this.props.clearSelectedRecommendation}
                contentLabel="Recommendation"
                className="home-modal-card"
                >
                    <div>
                    

                    {
                        /*
                        //Favorite status
                    

                        <span>{this.props.lang === 'English' ? 'Favorite' : 'Favorita'}: </span>
                        */
                    }
                    {
                        //Favorite star
                    }

                    <div title={this.   props.lang === 'English' ? 'Mark as favorite' : 'Marcar como favorita'} className="text-right" style={{paddingBottom: '0', marginBottom: '0'}}>
                    <StarRatingComponent
                        name="favorite"
                        starCount={1}
                        value={this.props.isFavorite}
                        starColor={'#5933aa'}
                        renderStarIcon={(index, value) => {
                            return (
                              <span style={{transition: '0.3s'}}>
                                <i className={index <= value ? 'fa fa-star fa-3x' : 'fa fa-star fa-2x'} />
                              </span>
                            );
                          }}
                        onStarClick = {(nextValue, prevValue, name) => {
                            let favorite = false
                            if(prevValue == 0)
                                favorite = true
                            axios.post('https://beta.edvotech.com/api/teacher/recommendations/favorite',{
                                recomid: this.props.recommendation.recoID,
                                favorite: favorite
                            },{
                                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                            }).then(response =>{
                            if(prevValue == 0){
                                //Add to favorites list 
                                this.props.dispatch(addFavoriteRecommendation(this.props.recommendation));
                            }else{
                                //Remove from favorites list through filter
                                this.props.dispatch(removeFavoriteRecommendation({recoID: this.props.recommendation.recoID}));
                            }});
                        }}
                    />
                </div>
                        <div>
                            <div className="text-center form__title">
                                <h2 className="">{this.props.recommendation.title}</h2>
                            </div>
                            {
                                //Header
                            }
                            <div className="text-center">
                                <h4 className="font-weight-bold">{this.props.recommendation.header}</h4>
                                <hr/>
                            </div>
                        </div>

                        <div className="teacher-modal-body">
                        <div>
                            {
                                //Description
                            }
                                <div dangerouslySetInnerHTML={{ __html: this.props.recommendation.description}} />
                            
                            <hr/>
                                {
                                    //Location
                                }
                                    {this.props.recommendation.location && <h4>Location: {this.props.recommendation.location}</h4>}

                                {
                                    //Date of assignment
                                }
                                    <h4>{this.props.lang === 'English' ? 'Date: ' : 'Fecha: '}
                                        {moment(this.props.recommendation.date).format("YYYY-MM-DD")}
                                    </h4>
                                
                            <div className="text-left">
                                {
                                    //Rating
                                }
                                    <span>
                                        {this.props.lang === 'English' ? 'Rate: ': 'Calificar: '}
                                    </span>

                                {
                                    //Rating star system
                                }
                                    <StarRatingComponent
                                        name="rate"
                                        starCount={5}
                                        starColor={'#ffb400'}
                                        renderStarIcon={(index, value) => {
                                            return (
                                              <span style={{transition: '0.3s'}}>
                                                <i className={index <= value ? 'fa fa-star fa-lg' : 'fa fa-star fa'} />
                                              </span>
                                            );
                                          }}
                                        value={this.props.recommendation.rate}
                                        
                                        onStarClick={(nextValue, prevValue, name) => {
                                            axios.post('https://beta.edvotech.com/api/teacher/recommendations/rate',{
                                                recomid: this.props.recommendation.recoID,
                                                rate: nextValue
                                            },{
                                                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                                            }).then(response =>{
                                                this.props.dispatch(rateRecommendation({recoID: this.props.recommendation.recoID, rate: nextValue}));
                                                this.props.dispatch(rateTopAndMostRecent({recoID: this.props.recommendation.recoID, rate: nextValue}));
                                            })}}
                                    />
                        
                            </div>
                            
                            
                        </div>
                        </div>

                        {
                            //Button to close modal
                        }
                        <div className="text-center">
                            <button onClick = {this.props.clearSelectedRecommendation}>
                                <div className="btn btn-item text-center">
                                    {this.props.lang === 'English' ? 'Close' : 'Cerrar'}
                                </div>
                            </button>
                        </div>
                    </div>
            </Modal>
        </div>
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
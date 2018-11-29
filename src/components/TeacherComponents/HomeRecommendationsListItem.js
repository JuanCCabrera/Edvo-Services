import React from 'react';
import {connect} from 'react-redux';
import {selectRecommendation} from '../../actions/teacherRecommendations';
import axios from 'axios';
import auth0Client from '../../Auth';

/**
 * Single item of the Teacher Recommendations list. It contains the recommendation's title, date of assignment and header. 
 * @param {*} props - Default properties and the current language state. 
 */
const HomeRecommendationsListItem = (props) => (
    //Open recommendation modal when recommendation item is selected. 
        <div className="list-group-item">
            <div className="clickable" onClick={() => {
                if(props.reco.read != null){
                    axios.post('https://beta.edvotech.com/api/teacher/recommendations/read', {
                        recomid: props.reco.recoID
                    },
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
                    .then((response)=>{
                        if(response.status == 201){
                        }
                    });
                    }
                    else{
                    }
                    props.dispatch(selectRecommendation(props.reco));
                    }}>
            {
                //Recommendation title and date of assignment. 
            }
                <h4>{props.reco.title}</h4> <h5>{props.lang === 'English' ? 'Date' : 'Fecha'}: {props.reco.date.slice(0,10)}</h5>
            {
                //Recommendation header
            }
                <h5>{props.reco.header}</h5>
                
            </div>
        </div>
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(HomeRecommendationsListItem);
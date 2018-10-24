import React from 'react';
import {connect} from 'react-redux';
import RecommendationListItem from './RecommendationListItem';

class RecommendationsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1}
    }

    render(){
        return(
            <div>
                <h3>Recommendations</h3>
                {this.props.recommendation.map((reco) => {
                    return <RecommendationListItem key={reco.id} reco={reco} selectedRecommendation={this.props.assigned.recoID}/>
                })}
                <br/>
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
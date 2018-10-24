import React from 'react';
import RecommendationsUserList from './RecommendationsUserList';
import RecommendationList from './RecommendationList';
import { clearSelection, assignRecommendation } from '../../actions/assignRecommendations';
import {connect} from 'react-redux';

 const AssignRecommendations = (props) => (
        <div>
            {
                //User List
            }
            <RecommendationsUserList/>
            {
                //Recommendations List
            }
            <RecommendationList/>

            <div>
                <button disabled={!props.assigned.userID && !props.assigned.recoID} onClick={() => {
                    props.dispatch(clearSelection());
                }}>Clear Selection</button>
                <button disabled={!props.assigned.userID || !props.assigned.recoID} onClick={() => {
                    props.dispatch(assignRecommendation());
                }}>Assign Recommendation</button>  
            </div>
        </div>
 );

const mapStateToProps = (state) => ({
    assigned: state.assignRecommendation
});

 export default connect(mapStateToProps)(AssignRecommendations);
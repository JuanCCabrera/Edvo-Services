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
                }}>{props.lang === 'English' ? 'Clear Selection' : 'Deshacer Selección'}</button>
                <button disabled={!props.assigned.userID || !props.assigned.recoID} onClick={() => {
                    props.dispatch(assignRecommendation());
                }}>{props.lang === 'English' ? 'Assign Recommendation' : 'Asignar Recomendación'}</button>  
            </div>
        </div>
 );

const mapStateToProps = (state) => ({
    assigned: state.assignRecommendation,
    lang: state.language.lang
});

 export default connect(mapStateToProps)(AssignRecommendations);
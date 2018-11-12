import React from 'react';
import RecommendationsUserList from './RecommendationsUserList';
import RecommendationList from './RecommendationList';
import { clearSelection, assignRecommendation } from '../../actions/assignRecommendations';
import {connect} from 'react-redux';
import UserFilters from '../Filters/UserFilters';
import RecommendationsFilters from '../Filters/RecommendationsFilters';

/**
 * Assign Recommendations page layout. 
 * @param {*} props - Default properties, current language state and recommendation assignment information. 
 */
 const AssignRecommendations = (props) => (
        <div>
            {
                //User List with filters
            }
            <UserFilters/>
            <RecommendationsUserList/>
            {
                //Recommendations List with filters
            }
            <RecommendationsFilters/>
            <RecommendationList/>

            <div>
                {
                    //Button to clear selection for recommendation assignment. 
                }
                <button disabled={!props.assigned.userID && !props.assigned.recoID} onClick={() => {
                    props.dispatch(clearSelection());
                }}>{props.lang === 'English' ? 'Clear Selection' : 'Deshacer Selección'}</button>
                {
                    //Button to assign recommendation based on the selected user and recommendation. 
                }
                <button disabled={!props.assigned.userID || !props.assigned.recoID} onClick={() => {
                    props.dispatch(assignRecommendation());
                }}>{props.lang === 'English' ? 'Assign Recommendation' : 'Asignar Recomendación'}</button>  
            </div>
        </div>
 );

 //Map current language state and recommendation assignment data to component's properties. 
const mapStateToProps = (state) => ({
    assigned: state.assignRecommendation,
    lang: state.language.lang
});

//Connect component to controller. 
 export default connect(mapStateToProps)(AssignRecommendations);
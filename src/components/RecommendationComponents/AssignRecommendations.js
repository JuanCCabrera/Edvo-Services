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
                //The list is only displayed if there are users registered in the system. 
            }
            {props.users.length !== 0 ? 
            <div>
                {props.assigned.userID !== '' ? 
                    <div>
                        <RecommendationsFilters/>
                        <RecommendationList/>
                    </div> :
                    <div>
                        <p>{props.lang === 'English' ? 'Please select a user.' : 'Por favor escoja un usuario.'}</p>
                    </div>
                }
            </div>
            :
            <div>
                {
                    //Do not show instructions or recommendations list if there are no users in the system. 
                }
            </div>
            }

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
                    console.log(props.assigned);
                    props.dispatch(assignRecommendation());
                }}>{props.lang === 'English' ? 'Assign Recommendation' : 'Asignar Recomendación'}</button>  
            </div>
        </div>
 );

 //Map current language state and recommendation assignment data to component's properties. 
const mapStateToProps = (state) => ({
    users: state.users,
    assigned: state.assignRecommendation,
    lang: state.language.lang
});

//Connect component to controller. 
 export default connect(mapStateToProps)(AssignRecommendations);
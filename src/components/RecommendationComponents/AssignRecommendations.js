import React from 'react';
import RecommendationsUserList from './RecommendationsUserList';
import RecommendationList from './RecommendationList';
import { clearSelection, assignRecommendation } from '../../actions/assignRecommendations';
import {connect} from 'react-redux';
import UserFilters from '../Filters/UserFilters';
import RecommendationsFilters from '../Filters/RecommendationsFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

 const AssignRecommendations = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-assign"
    yes={() => (
        <div>
            {
                //User List
            }
            <UserFilters/>
            <RecommendationsUserList/>
            {
                //Recommendations List
            }
            <RecommendationsFilters/>
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
                             )}
                             no={() => <Redirect to="/" />}
                           />
 );

const mapStateToProps = (state) => ({
    assigned: state.assignRecommendation,
    lang: state.language.lang
});

 export default connect(mapStateToProps)(AssignRecommendations);
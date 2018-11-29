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
import axios from 'axios';
import {setSuccessModal} from '../../actions/successModal';
import {setFailureModal} from '../../actions/failureModal';
import {removeUser} from '../actions/user';
/**
 * Assign Recommendations page layout. 
 * @param {*} props - Default properties, current language state and recommendation assignment information. 
 */
 const AssignRecommendations = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-assign"
    yes={() => (
    <div>
     <div className="row text-center" style={{margin: '2rem'}}>
        <div className="col-sm-6">
            {
                //Button to clear selection for recommendation assignment. 
            }
                <div>
                    <button disabled={!(props.assigned.userID || props.assigned.recoID)} onClick={() => {
                        props.dispatch(clearSelection());
                    }}>
                        <div className="btn btn-item">
                        {props.lang === 'English' ? 'Clear Selection' : 'Deshacer Selección'}
                        </div>
                    </button>
                </div>
        </div>
        <div>
            {
                //Button to assign recommendation based on the selected user and recommendation. 
            }
            <div>
                <button disabled={!(props.assigned.userID && props.assigned.recoID)} onClick={() => {
                    props.dispatch(assignRecommendation());
                    axios.post('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/recommendations/assign', {
                        recomid: props.assigned.recoID,
                        usersToAssign: props.assigned.userID
                    },
                    {
                        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` 
                    }})
                        .then(response=>{
                            if(response.status == 201)
                                props.dispatch(setSuccessModal());
                                props.dispatch(removeUser({id: user.id}));
                    })
                    .catch(error=>{
                        if(error)
                            props.dispatch(setFailureModal()); 
                    });

                }}>
                    <div className="btn btn-item">
                        {props.lang === 'English' ? 'Assign Recommendation' : 'Asignar Recomendación'} 
                        <i className="fa fa-arrow-right" aria-hidden="true" style={{marginLeft: '1rem'}}></i>
                    </div>
                </button>  
            </div>
            
        </div>
    </div>
        <div className="row">
            <div className="col-sm-6">
                    
                {
                    //Page title 
                }
                <div className="big-card" style={{marginTop: '0.5rem'}}>
                    <div className="form__title">
                        <p>{props.lang === 'English' ? 'Users' : 'Usuarios'}</p>
                        <hr className="break" style={{borderColor: '#5933AA'}}/>
                    </div>
                    {
                        //User List with filters
                    }
                    <UserFilters inAssignmentPage={true}/>
                    <div className="list-group">
                        <RecommendationsUserList/>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                {
                    //Recommendations List with filters
                    //The list is only displayed if there are users registered in the system. 
                }
                {props.users.length !== 0 ? 
                <div>
                    {props.assigned.userID !== '' ? 
                        <div>
                            
                            {
                                //Page title
                            }
                            
                            <div className="big-card" style={{marginTop: '0.5rem'}}>
                            <div className="form__title">
                                <p>{props.lang === 'English' ? 'Recomendations' : 'Recomendaciones'}</p>
                                <hr className="break" style={{borderColor: '#5933AA'}}/>
                            </div>
                                <RecommendationsFilters/>
                                <div className="list-group">
                                    <RecommendationList/>
                                </div>
                            </div>
                        </div> :
                        <div className="item-card text-center" style={{marginTop: '0.5rem', fontWeight: 'bold', color: '#5933AA', paddingBottom: '1rem', minHeight: '1rem'}}>
                            <p>{props.lang === 'English' ? 'Please select a user.' : 'Por favor, escoja un usuario.'}</p>
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
            </div>
        </div>
    </div>
        )}
        no={() => <Redirect to="/login"/>}
    />
            
 );

 //Map current language state and recommendation assignment data to component's properties. 
const mapStateToProps = (state) => ({
    users: state.users,
    assigned: state.assignRecommendation,
    lang: state.language.lang
});

//Connect component to controller. 
 export default connect(mapStateToProps)(AssignRecommendations);
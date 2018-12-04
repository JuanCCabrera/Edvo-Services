import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import { selectUser } from '../../actions/assignRecommendations';
import {selectUserToDisplay } from '../../actions/userModal';
import axios from 'axios';
import auth0Client from '../../Auth';
import {setLoadingModal} from '../../actions/loadingModal';
import {setSuccessModal} from '../../actions/successModal';
import {setFailureModal} from '../../actions/failureModal';
import {loadRecommendation, unloadRecommendations} from '../../actions/recommendations';

/**
 * Single item from the RecommendationsUserList. 
 */
const RecommendationsUserListItem = (props) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-sm-10 card-title">
            {
                //User name and last name
            }
                <p className="card-title">
                    {props.user.name + ' ' + props.user.lastName} 
                </p>
            </div>
            {
                //Icon displayed if user has been selected to receive a recommendation assignment. 
            }
            <div className="col-sm-2">
                    {props.user.id === props.selectedUser && 
                    <div>
                        <span style={{display: 'inline'}}><i className="fa fa-check-circle fa-lg" style={{color: 'green'}} aria-hidden="true"></i></span>
                    </div>}
            </div>
        </div>
        {
            //User email
        }
        <p className="card-text">Email: {props.user.email}</p>
        {
            //<h6>Has weekly recommendation: {props.user.weeklyReco ? 'Yes' : 'No'}</h6>
        }
        {
            //Challenge categories displayed in badges. 
        }
        <p>{props.lang === 'English' ? 'Categories' : 'Categorías'}: 
        <br/>
        {props.user.categories.map((category) => {
            return (
                <div key={uuid()}>
                <span key={uuid()}>
                    {category == "Teaching Strategies" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{props.lang === 'English' ? "Teaching Strategies" : "Estrategias de Enseñanza"}</span>}
                    {category == "Updated Material" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'}</span>}
                    {category == "Time Management" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'}</span>}
                    {category == "Technology Integration" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'}</span>}
                    {category == "Instructional Alignment" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{props.lang === 'English' ? 'Instructional Alignment' : 'Alineación Curricular'}</span>}
                </span>
                <br/>
                </div>)
        })}
        </p>
        {
            //Button used to select a user for recommendation assignment. 
        }
            <button onClick={() => {
                //Set loading modal
                props.dispatch(setLoadingModal());
                //Unload recommendations from central controller. 
                props.dispatch(unloadRecommendations());
                //Get recommendation information which can be assigned to the user from the database. 
                axios.get('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/user/recommendations',{

                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` },

                params: {
                userToAssign: props.user.id
                }
                })
                .then(response => {
                //Dispatch user selection to the central controller. 
                props.dispatch(selectUser({userID: props.user.id}));
                //Load recommendations to the central controller. 
                response.data.recommendations.forEach(element => {
                    props.dispatch(loadRecommendation({
                        id: element.recomid, 
                        title: element.title,
                        header: element.header, 
                        multimedia: element.multimedia, 
                        description: element.description,
                        teachingStrategies: element.strategies,
                        updatedMaterial: element.material,
                        timeManagement: element.timemanagement,
                        technologyIntegration: element.tech,
                        instructionAlignment: element.instructions,
                        applications: element.applications,
                        moodle: element.moodle,
                        googleclassroom: element.googleclassroom,
                        emailResource: element.emails,
                        books: element.books,
                        socialMedia: element.socialmedia,
                        projector: element.projector,
                        computer: element.computer,
                        tablet: element.tablet,
                        stylus: element.stylus,
                        internet: element.internet,
                        smartboard:element.smartboard,
                        smartpencil:element.smartpencil,
                        speakers: element.speakers,
                        
                        topics: [element.topica, element.topicb, element.topicc],
                        location: element.location,
                        subject: element.subject,
                        language: element.english == true ? 'english' : 'spanish',
                        type: element.type,
                        schoolType: element.schooltype,
                        format: element.format,
                        level: element.level,
                        size: element.groupsize
                    }));

                })
                //Clear loading modal
                props.dispatch(setLoadingModal());
                }).catch(error =>{
                    if(error.response.status > 300){
                        //Clear loading modal
                        props.dispatch(setLoadingModal());
                        //Set failure modal. 
                        props.dispatch(setFailureModal());
                    }
                });
            }}>
            {
                //Button to select the user. 
            }
                <p className="btn btn-item">
                    {props.lang === 'English' ? 'Select' : 'Seleccionar'}
                </p>
            </button>
            {
                //Button to display User Modal. 
            }

            <button onClick={() => {
                props.dispatch(selectUserToDisplay(props.user));
            }}>
                <p className="btn btn-item">
                    {props.lang === 'English' ? 'View More Information' : 'Ver Más Información'}
                </p>
            </button>
    </div>
);

//Map language settings to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the central controller. 
export default connect(mapStateToProps)(RecommendationsUserListItem);
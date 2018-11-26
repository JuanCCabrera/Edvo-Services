import React from 'react';
import {connect} from 'react-redux';
import { removeRecommendation } from '../../actions/recommendations';
import {Link} from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../../Auth';
import setSuccessModal from '../../actions/successModal';
import setFailureModal from '../../actions/failureModal';

/**
 * Single item of the Recommendations List
 * @param {*} props - Recommendations list item information following the object model below:
    recommendation: {
        id: '',
        title: '',
        multimedia: '',
        header: '',
        description: '',
        teachingStrategies: false,
        updatedMaterial: false,
        timeManagement: false,
        technologyIntegration: false,
        instructionAlignment: false,
        moodle: false,
        googleClassroom: false,
        emailResource: false,
        applications: false,
        books: false,
        socialMedia: false,
        projector: false,
        computer: false,
        tablet: false,
        stylus: false,
        internet: false,
        smartboard: false,
        smartpencil: false,
        speakers: false,
        topics: [],
        location: '',
        subject: '',
        language: 'english',
        type: 'event',
        schoolType: 'public'
        format: ''
        groupSize: '',
        level: '',
        mentorID: '',
        question: '',
        choices: [],
        correctChoice: 0
    }
}
 */
class ManageRecommendationsListItem extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            toggleButton: false
        }
    }
    
    render(){
        return (
            <div className="item-card">
            {
                //Recommendation title
            }
                <p className="item__body card-title">{this.props.reco.title}</p>
            {
                //Recommendation header
            }
                <p className="item__body">{this.props.reco.header}</p>
            
            {
                //Link to edit the recommendation item
            }
                <Link to={`/recommendations/edit/${this.props.reco.id}`}>
                    <button>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Edit' : 'Modificar'}
                        </div>
                    </button>
                </Link>
            {
                //Button to remove recommendation
            }

                {this.state.toggleButton ? 
            
                    <div>
                        <br/>
                        <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                            {this.props.lang === 'English' ? 'Are you sure you would like to remove this recommendation?' : '¿Estás seguro de que quieres remover esta recomendación?'}
                        </div>
                        <br/>
                        <button onClick={() => {
                            axios.post('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/recommendations/remove',{
                                recomid: this.props.reco.id
                            },{
                                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                            })
                            .catch(error => {
                                if(error.response.status == 401 || error.response.status == 403){

                                this.props.dispatch(setFailureModal());
                            }
                            })  
                            .then(response=>{
                                console.log("RESPONSE: ", response);
                                console.log("RESPONSEstatus: ", response.status == 200);
                                console.log("RESPONSEdata: ", response.data);
                                if(response.status == 200){
                                    this.props.dispatch(removeRecommendation({id: this.props.reco.id}));
                                    this.setState(() => ({toggleButton: false}));}
                            })
                             
                        }}>
                        <div className="btn btn-item" style={{marginTop: '10px'}}>
                                {this.props.lang === 'English' ? 'Yes' : 'Si'}
                        </div>
                        </button>
        
                        <button onClick={() => {
                            this.setState(() => ({toggleButton: false}));
                        }}>
                        <div className="btn btn-item" style={{marginTop: '10px'}}>
                                {this.props.lang === 'English' ? 'No' : 'No'}
                        </div>
                        </button>
                    </div>
                    :
                    <div style={{display: 'inline-block'}}>
                    <button onClick={() => {this.setState(() => ({toggleButton: true}))}}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Remove' : 'Remover'}
                        </div>
                    </button>
                    </div>
                    }
            </div>
        );
        }
    }

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(ManageRecommendationsListItem);
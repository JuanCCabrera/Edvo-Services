import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

/**
 * Modal displayed when an assignment recommendation is selected. The modal displays information about the recommendation according to its creation information. 
 * @param {*} props - Default properties, current language state, selected recommendation information. 
 */
class AssignmentRecommendationModal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="modal">
                <Modal
                isOpen = {this.props.recoInfo.assignmentRecommendationFlag}
                onRequestClose = {this.props.clearSelectedRecommendation}
                contentLabel="User"
                closeTimeoutMS={200} 
                >
                <div>
                    <h1 className="form__title">{this.props.recoSpec.title}</h1>
                    <h2>{this.props.recoSpec.header}</h2>
                    <p>{this.props.recoSpec.description}</p>
                    <hr/>
                    <h3>Class Information</h3>
                    <p>Subject: {this.props.recoSpec.subject}</p>
                    <p>Format: {this.props.recoSpec.format}</p>
                    <p>Language: {this.props.recoSpec.language}</p>
                    <p>Level: {this.props.recoSpec.level}</p>
                    <p>Group size: {this.props.recoSpec.size} students</p>
                    <p>Class Topics:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.recoSpec.topics[0] && <li>{this.props.recoSpec.topics[0]}</li>}
                            {this.props.recoSpec.topics[1] && <li>{this.props.recoSpec.topics[1]}</li>}
                            {this.props.recoSpec.topics[2] && <li>{this.props.recoSpec.topics[2]}</li>}
                        </ul>
                    <div class="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div class="panel-heading"><h4 style={{margin: '0'}}>Challenge Categories:</h4></div>
                        <div class="panel-body">
                            <ul style={{listStyleType: 'circle'}}>
                                {this.props.recoSpec.teachingStrategies && <li>Teaching Strategies</li>}
                                {this.props.recoSpec.updatedMaterial && <li>Updated Material</li>}
                                {this.props.recoSpec.timeManagement && <li>Time Management</li>}
                                {this.props.recoSpec.technologyIntegration && <li>Technology Integration</li>}
                                {this.props.recoSpec.instructionAlignment && <li>Instructional Alignment</li>}
                            </ul>
                        </div>
                    </div>
                
                    <br/>
                    {
                        //Button to close modal
                    }
                    <div className="btn btn-item">
                        <button onClick = {this.props.clearSelectedRecommendation}>{this.props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
                    </div>
                </div>
                </Modal>
            </div>
            );
    }
}

//Map value indicating favorite status, selected recommendation information and current language state to component properties. 
const mapStateToProps = (state) => {
    console.log(state.assignmentRecommendationModal);
    return {
        recoInfo: state.assignmentRecommendationModal,
        recoSpec: state.assignmentRecommendationModal.selectedAssignmentRecommendation,
        lang: state.language.lang,
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(AssignmentRecommendationModal);
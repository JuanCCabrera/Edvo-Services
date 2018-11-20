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
                    <h4>{this.props.recoSpec.header}</h4>
                    <p>{this.props.recoSpec.description}</p>
                    <hr/>
                    <h3 style={{textDecoration: 'underline'}}>{this.props.lang === 'English' ? 'Class Information' : 'Información del Curso'}</h3>
                    <p>{this.props.lang === 'English' ? 'Subject' : 'Tema'}: {this.props.recoSpec.subject}</p>
                    <p>{this.props.lang === 'English' ? 'Format' : 'Formato'}: {this.props.recoSpec.format}</p>
                    <p>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}: {this.props.recoSpec.language}</p>
                    <p>{this.props.lang === 'English' ? 'Level' : 'Nivel'}: {this.props.recoSpec.level}</p>
                    <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.recoSpec.size} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
                    <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.recoSpec.topics[0] && <li>{this.props.recoSpec.topics[0]}</li>}
                            {this.props.recoSpec.topics[1] && <li>{this.props.recoSpec.topics[1]}</li>}
                            {this.props.recoSpec.topics[2] && <li>{this.props.recoSpec.topics[2]}</li>}
                        </ul>
                    <div class="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div class="panel-heading"><h4 style={{margin: '0'}}>{this.props.lang === 'English' ? 'Challenge Categories' : 'Categorías de Retos'}:</h4></div>
                        <div class="panel-body">
                            <ul style={{listStyleType: 'circle'}}>
                                {this.props.recoSpec.teachingStrategies && <li>{this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Enseñanza'}</li>}
                                {this.props.recoSpec.updatedMaterial && <li>{this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'}</li>}
                                {this.props.recoSpec.timeManagement && <li>{this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'}</li>}
                                {this.props.recoSpec.technologyIntegration && <li>{this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'}</li>}
                                {this.props.recoSpec.instructionAlignment && <li>{this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineación Curricular'}</li>}
                            </ul>
                        </div>
                    </div>
                
                    <br/>
                    <div style={{textAlign: 'center'}}>
                    {
                        //Button to close modal
                    }
                    
                        <div className="btn btn-item">
                            <button onClick = {this.props.clearSelectedRecommendation}>{this.props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
                        </div>
                    </div>
                </div>
                </Modal>
            </div>
            );
    }
}

//Map value indicating favorite status, selected recommendation information and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        recoInfo: state.assignmentRecommendationModal,
        recoSpec: state.assignmentRecommendationModal.selectedAssignmentRecommendation,
        lang: state.language.lang,
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(AssignmentRecommendationModal);
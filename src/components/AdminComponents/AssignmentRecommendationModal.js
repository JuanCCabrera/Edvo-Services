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
                <Modal
                isOpen = {this.props.recoInfo.assignmentRecommendationFlag}
                onRequestClose = {this.props.clearSelectedRecommendation}
                contentLabel="Assignment Recommendation"
                closeTimeoutMS={200} 
                className="assign-modal-card"
                >
                <div>
                    <h1 className="form__title">{this.props.recoSpec.title}</h1>
                    <h4>{this.props.recoSpec.header}</h4>
                    <p>{this.props.recoSpec.description}</p>
                    <hr/>
                    <h3 className="text-center" style={{textDecoration: 'underline'}}>{this.props.lang === 'English' ? 'Class Information' : 'Información del Curso'}</h3>
                    <p>{this.props.lang === 'English' ? 'Subject' : 'Materia'}: {this.props.recoSpec.subject}</p>
                    {
                        //Class format
                    }
                        {this.props.lang === 'English' ? 
                        <div>
                            {this.props.recoSpec.format == "classroom" && <p>Format: Classroom</p>}
                            {this.props.recoSpec.format == "blended" && <p>Format: Blended</p>}
                            {this.props.recoSpec.format == "online" && <p>Format: Online</p>}
                        </div>
                        :
                        <div>
                            {this.props.recoSpec.format == "classroom" && <p>Formato: Salón de Clases</p>}
                            {this.props.recoSpec.format == "blended" && <p>Formato: Mixto</p>}
                            {this.props.recoSpec.format == "online" && <p>Formato: En Línea</p>}
                        </div>
                        }

                    {
                        //Class language
                    }
                        {this.props.lang === 'English' ?  
                        <p>
                            {this.props.recoSpec.language == "spanish" ? 'Language: Spanish' : 'Language: English'}
                        </p>
                        :
                        <p>
                            {this.props.recoSpec.language == "spanish" ? 'Lenguaje: Español' : 'Language: Inglés'}
                        </p>
                        }

                    {
                        //Class level
                    }
                        {this.props.lang === 'English' ? 
                        <div>
                            <p>Level: {this.props.recoSpec.level}</p>
                        </div>
                        :
                        <div>
                            {this.props.recoSpec.level == "Kindergarden - 3rd grade" && <p>Nivel: Kindergarden - 3er grado</p>}
                            {this.props.recoSpec.level == "4th - 6th grade" && <p>Nivel: 4to - 6to grado</p>}
                            {this.props.recoSpec.level == "7th - 8th grade" && <p>Nivel: 7mo - 8vo grado</p>}
                            {this.props.recoSpec.level == "9th - 12th grade" && <p>Nivel: 9no - 12mo grado</p>}
                            {this.props.recoSpec.level == "University / College" && <p>Nivel: Universidad/Colegio</p>}
                        </div>
                        
                        }
                    <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.recoSpec.size} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
                    <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.recoSpec.topics[0] && <li>{this.props.recoSpec.topics[0]}</li>}
                            {this.props.recoSpec.topics[1] && <li>{this.props.recoSpec.topics[1]}</li>}
                            {this.props.recoSpec.topics[2] && <li>{this.props.recoSpec.topics[2]}</li>}
                        </ul>
                    <br/>
                    <div className="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div className="panel-heading"><h4 style={{margin: '0'}}>{this.props.lang === 'English' ? 'Challenge Categories' : 'Categorías de Retos'}:</h4></div>
                        <div className="panel-body">
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
                    
                        
                            <button className="btn btn-item" onClick = {this.props.clearSelectedRecommendation}>
                                <div>
                                    {this.props.lang === 'English' ? 'Close' : 'Cerrar'}
                                </div>
                            </button>
                    </div>
                </div>
                </Modal>
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
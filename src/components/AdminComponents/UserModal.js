import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

/**
 * Modal displayed when a user is selected. The modal displays information about the user according to their registration information. 
 * @param {*} props - Default properties, current language state, selected user information. 
 */
class UserModal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <Modal
                isOpen = {this.props.userInfo.userModalFlag}
                onRequestClose = {this.props.clearSelectedUser}
                contentLabel="User"
                closeTimeoutMS={200} 
                className="user-modal-card"
                >
                <div>
                    <h1 className="form__title" style={{marginBottom: '1.5rem'}}>{this.props.userSpec.name} {this.props.userSpec.lastName}</h1>
                    <p style={{textAlign: 'center'}}>Email: {this.props.userSpec.email}</p>
                    <hr/>

                    <h3 className="text-center" style={{textDecoration: 'underline'}}>{this.props.lang === 'English' ? 'Class Information' : 'Información del Curso'}</h3>
                    <br/>
                    <p>{this.props.lang === 'English' ? 'Subject' : 'Materia'}: {this.props.userSpec.subject}</p>
                    {
                        //Class format
                    }
                        {this.props.lang === 'English' ? 
                        <div>
                            {this.props.userSpec.format == "classroom" && <p>Format: Classroom</p>}
                            {this.props.userSpec.format == "blended" && <p>Format: Blended</p>}
                            {this.props.userSpec.format == "online" && <p>Format: Online</p>}
                        </div>
                        :
                        <div>
                            {this.props.userSpec.format == "classroom" && <p>Formato: Salón de Clases</p>}
                            {this.props.userSpec.format == "blended" && <p>Formato: Mixto</p>}
                            {this.props.userSpec.format == "online" && <p>Formato: En Línea</p>}
                        </div>
                        }

                    {
                    //Class language
                    }
                    {this.props.lang === 'English' ?  
                        <p>
                            {this.props.userSpec.language == "spanish" ? 'Language: Spanish' : 'Language: English'}
                        </p>
                        :
                        <p>
                            {this.props.userSpec.language == "spanish" ? 'Lenguaje: Español' : 'Language: Inglés'}
                        </p>
                    }

                    {
                        //Class level
                    }
                        {this.props.lang === 'English' ? 
                        <div>
                            <p>Level: {this.props.userSpec.level}</p>
                        </div>
                        :
                        <div>
                            {this.props.userSpec.level == "Kindergarden - 3rd grade" && <p>Nivel: Kindergarden - 3er grado</p>}
                            {this.props.userSpec.level == "4th - 6th grade" && <p>Nivel: 4to - 6to grado</p>}
                            {this.props.userSpec.level == "7th - 8th grade" && <p>Nivel: 7mo - 8vo grado</p>}
                            {this.props.userSpec.level == "9th - 12th grade" && <p>Nivel: 9no - 12mo grado</p>}
                            {this.props.userSpec.level == "University / College" && <p>Nivel: Universidad/Colegio</p>}
                        </div>
                        
                        }
                    <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.userSpec.groupsize} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
                    <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.userSpec.topica && <li>{this.props.userSpec.topica}</li>}
                            {this.props.userSpec.topicb && <li>{this.props.userSpec.topicb}</li>}
                            {this.props.userSpec.topicc && <li>{this.props.userSpec.topicc}</li>}
                        </ul>
                    <br/>
                    <div className="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div className="panel-heading"><h4 style={{margin: '0'}}>{this.props.lang === 'English' ? 'Available Resources' : 'Recursos Disponibles'}</h4></div>
                        <div className="panel-body">
                            <ul style={{listStyleType: 'circle'}}>
                                {this.props.userSpec.moodle && <li>Moodle</li>}
                                {this.props.userSpec.googleclassroom && <li>Google Classroom</li>}
                                {this.props.userSpec.emails && <li>Emails</li>}
                                {this.props.userSpec.books && <li>{this.props.lang === 'English' ? 'Books' : 'Libros'}</li>}
                                {this.props.userSpec.applications && <li>{this.props.lang === 'English' ? 'Applications' : 'Aplicaciones'}</li>}
                                {this.props.userSpec.socialmedia && <li>{this.props.lang === 'English' ? 'Social Media' : 'Redes Sociales'}</li>}
                                {this.props.userSpec.projector && <li>{this.props.lang === 'English' ? 'Projector' : 'Proyector'}</li>}
                                {this.props.userSpec.computer && <li>{this.props.lang === 'English' ? 'Computer' : 'Computadora'}</li>}
                                {this.props.userSpec.tablet && <li>{this.props.lang === 'English' ? 'Tablet Computer' : 'Tableta (Computadora)'}</li>}
                                {this.props.userSpec.stylus && <li>Stylus</li>}
                                {this.props.userSpec.internet && <li>Internet</li>}
                                {this.props.userSpec.smartboard && <li>Smart Board</li>}
                                {this.props.userSpec.smartpencil && <li>Smart Pencil</li>}
                                {this.props.userSpec.speakers && <li>{this.props.lang === 'English' ? 'Speakers' : 'Bocinas'}</li>}
                            </ul>
                        </div>
                    </div>
                
                    <div style={{textAlign: 'center'}}>
                    {
                        //Button to close modal
                    }
                        <button className="btn btn-item" onClick = {this.props.clearSelectedUser}>
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
        userInfo: state.userModal,
        userSpec: state.userModal.selectedUser,
        lang: state.language.lang,
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(UserModal);
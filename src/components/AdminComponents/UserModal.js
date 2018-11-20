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
            <div className="modal">
                <Modal
                isOpen = {this.props.userInfo.userModalFlag}
                onRequestClose = {this.props.clearSelectedUser}
                contentLabel="User"
                closeTimeoutMS={200} 
                >
                <div>
                    <h1 className="form__title">{this.props.userSpec.name} {this.props.userSpec.lastName}</h1>
                    <p>Email: {this.props.userSpec.email}</p>
                    <h3>{this.props.lang === 'English' ? 'Class Information' : 'Información del Curso'}</h3>
                    <p>{this.props.lang === 'English' ? 'Subject' : 'Tema'}: {this.props.recoSpec.subject}: {this.props.userSpec.subject}</p>
                    <p>{this.props.lang === 'English' ? 'Format' : 'Formato'}: {this.props.recoSpec.format}: {this.props.userSpec.format}</p>
                    <p>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}: {this.props.recoSpec.language}: {this.props.userSpec.language}</p>
                    <p>{this.props.lang === 'English' ? 'Level' : 'Nivel'}: {this.props.recoSpec.level}: {this.props.userSpec.level}</p>
                    <p>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}: {this.props.userSpec.groupsize} {this.props.lang === 'English' ? 'students' : 'estudiantes'}</p>
                    <p>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'}:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.userSpec.topica && <li>{this.props.userSpec.topica}</li>}
                            {this.props.userSpec.topicb && <li>{this.props.userSpec.topicb}</li>}
                            {this.props.userSpec.topicc && <li>{this.props.userSpec.topicc}</li>}
                        </ul>
                    <hr/>
                    <div class="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div class="panel-heading"><h4 style={{margin: '0'}}>{this.props.lang === 'English' ? 'Available Resources' : 'Recursos Disponibles'}</h4></div>
                        <div class="panel-body">
                            <ul style={{listStyleType: 'circle'}}>
                                {this.props.userSpec.moodle && <li>Moodle</li>}
                                {this.props.userSpec.googleClassroom && <li>Google Classroom</li>}
                                {this.props.userSpec.emails && <li>Emails</li>}
                                {this.props.userSpec.books && <li>{this.props.lang === 'English' ? 'Books' : 'Libros'}</li>}
                                {this.props.userSpec.applications && <li>{this.props.lang === 'English' ? 'Applications' : 'Aplicaciones'}</li>}
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
                
                    <br/>
                    {
                        //Button to close modal
                    }
                    <div className="btn btn-item">
                        <button onClick = {this.props.clearSelectedUser}>{this.props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
                    </div>
                </div>
                </Modal>
            </div>
            );
    }
}

//Map value indicating favorite status, selected recommendation information and current language state to component properties. 
const mapStateToProps = (state) => {
    console.log(state.userModal.selectedUser);
    return {
        userInfo: state.userModal,
        userSpec: state.userModal.selectedUser,
        lang: state.language.lang,
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(UserModal);
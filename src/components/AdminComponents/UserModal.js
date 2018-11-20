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
                    <h3>Class Information</h3>
                    <p>Subject: {this.props.userSpec.subject}</p>
                    <p>Format: {this.props.userSpec.format}</p>
                    <p>Language: {this.props.userSpec.language}</p>
                    <p>Level: {this.props.userSpec.level}</p>
                    <p>Group size: {this.props.userSpec.groupsize} students</p>
                    <p>Class Topics:</p>
                        <ul style={{listStyleType: 'circle'}}>
                            {this.props.userSpec.topica && <li>{this.props.userSpec.topica}</li>}
                            {this.props.userSpec.topicb && <li>{this.props.userSpec.topicb}</li>}
                            {this.props.userSpec.topicc && <li>{this.props.userSpec.topicc}</li>}
                        </ul>
                    <div class="panel panel-default" style={{maxWidth: '25rem'}}>
                        <div class="panel-heading"><h4 style={{margin: '0'}}>Available Resources</h4></div>
                        <div class="panel-body">
                            <ul style={{listStyleType: 'circle'}}>
                                {this.props.userSpec.moodle && <li>Moodle</li>}
                                {this.props.userSpec.googleClassroom && <li>Google Classroom</li>}
                                {this.props.userSpec.emails && <li>Emails</li>}
                                {this.props.userSpec.books && <li>Books</li>}
                                {this.props.userSpec.applications && <li>Applications</li>}
                                {this.props.userSpec.projector && <li>Projector</li>}
                                {this.props.userSpec.computer && <li>Computer</li>}
                                {this.props.userSpec.tablet && <li>Tablet</li>}
                                {this.props.userSpec.stylus && <li>Stylus</li>}
                                {this.props.userSpec.internet && <li>Internet</li>}
                                {this.props.userSpec.smartboard && <li>Smart Board</li>}
                                {this.props.userSpec.smartpencil && <li>Smart Pencil</li>}
                                {this.props.userSpec.speakers && <li>Speakers</li>}
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
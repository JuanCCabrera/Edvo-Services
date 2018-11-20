import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { setSuccessModal } from '../actions/successModal';

const SuccessModal =(props) => (
    <div className="modal"> 
        <Modal
        isOpen = {props.successModal.successModalFlag === true}
        onRequestClose = {() => {
            props.dispatch(setSuccessModal());
        }}
        contentLabel="Success"
        closeTimeoutMS={200}
        className="modal-card" 
        >
        <div className="text-center" style={{padding: '2rem 2rem 1rem 2rem'}}>
            <span className="modal__checkmark"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
            <br/>
            <div>
                <div className="text-center">
                    <div className="card-title font-weight-bold" style={{color: 'white'}}>
                        <div style={{fontSize:'4rem'}}>
                            {props.lang === 'English' ? 'Success!' : 'Éxito!'}
                        </div> 
                        {props.lang === 'English' ? 'The action was completed successfully.' : 'La acción fue completada exitosamente.'}
                    </div>
                    <hr className="break" style={{borderColor: 'white'}}/>
                </div>
            </div>
        </div>
        <div className="text-center" style={{backgroundColor: 'white', marginTop: '0', padding: '1rem'}}>
                <button onClick={() => {props.dispatch(setSuccessModal())}}>
                        <p className="btn btn-item">
                            {props.lang === 'English' ? 'Continue' : 'Continuar'}
                        </p> 
                </button>
        </div>

        </Modal>
    </div>
);

//Map selected question information, value represeting the question's favorite status and the current language state to the component properties. 
const mapStateToProps = (state) => {
    
    return {
        lang: state.language.lang,
        successModal: state.successModal
    }
}
//Connect component to the controller. 
export default connect(mapStateToProps)(SuccessModal);


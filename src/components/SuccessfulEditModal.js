import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { setEditModal } from '../actions/editModal';

/**
 * Modal displayed when data is successfully edited/modified. 
 * @param {*} props - Default props and langauge settings
 */
const SuccessfulEditModal =(props) => (
    <div className="modal"> 
    {
        //Modal
    }
        <Modal
        isOpen = {props.editModal.editModalFlag === true}
        onRequestClose = {() => {
            props.dispatch(setEditModal());
        }}
        contentLabel="Successful Edit"
        closeTimeoutMS={200}
        className="modal-card" 
        >
        <div className="text-center" style={{padding: '2rem 2rem 1rem 2rem'}}>
        {
            //Checkmark icon
        }
            <span className="modal__checkmark"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
            <br/>
            <div>
                <div className="text-center">
                    <div className="card-title font-weight-bold" style={{color: 'white'}}>
                        <div style={{fontSize:'4rem'}}>
                        {
                            //"Great!" modal title
                        }
                            {props.lang === 'English' ? 'Great!' : '¡Perfecto!'}
                        </div> 
                        {
                            //Modal message
                        }
                        {props.lang === 'English' ? 'All changes have been saved successfully.' : 'Todos los cambios se han guardado.'}
                    </div>
                    <hr className="break" style={{borderColor: 'white'}}/>
                </div>
            </div>
        </div>
        {
            //Button to close modal
        }
        <div className="text-center" style={{backgroundColor: 'white', marginTop: '0', padding: '1rem'}}>
                <button onClick={() => {props.dispatch(setEditModal())}}>
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
        editModal: state.editModal
    }
}
//Connect component to the controller. 
export default connect(mapStateToProps)(SuccessfulEditModal);


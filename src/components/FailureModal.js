import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { setFailureModal } from '../actions/failureModal';

/**
 * Modal indicating that a failure occured while processing an HTTP request or because of connection loss. 
 * @param {*} props - Default properties and language settings
 */
const FailureModal =(props) => (
    <div className="modal"> 
    {
        //Modal
    }
        <Modal
        isOpen = {props.failureModal.failureModalFlag === true}
        onRequestClose = {() => {
            props.dispatch(setFailureModal());
        }}
        contentLabel="Failure"
        closeTimeoutMS={200}
        className="modal-card" 
        >
        <div className="text-center" style={{padding: '2rem 2rem 1rem 2rem'}}>
        {
            //Exclamation icon
        }
            <span className="modal__checkmark"><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
            <br/>
            <div>
            {
                //Modal body
            }
                <div className="text-center">
                    <div className="card-title font-weight-bold" style={{color: 'white'}}>
                    {
                        //"Sorry" message
                    }
                        <div style={{fontSize:'4rem'}}>
                            {props.lang === 'English' ? 'Sorry' : 'Perdón'}
                        </div> 
                    {
                        //"Try again later" message
                    }
                        <div style={{fontSize: '2rem'}}>
                            {props.lang === 'English' ? 'An error has occured. Please refresh the page or try again later.' : 'Ha ocurrido un error. Por favor recargue la página o trate otra vez luego.'}
                        </div>
                    </div>
                    <hr className="break" style={{borderColor: 'white'}}/>
                </div>
            </div>
        </div>
        {
            //Button to close the failure modal
        }
        <div className="text-center" style={{backgroundColor: 'white', marginTop: '0', padding: '1rem', paddingBottom: '2rem'}}>
                <button className="btn btn-item" onClick={() => {props.dispatch(setFailureModal())}}>
                        <div>
                            {props.lang === 'English' ? 'Close' : 'Cerrar'}
                        </div> 
                </button>
        </div>

        </Modal>
    </div>
);

//Map selected question information, value represeting the question's favorite status and the current language state to the component properties. 
const mapStateToProps = (state) => {
    
    return {
        lang: state.language.lang,
        failureModal: state.failureModal
    }
}
//Connect component to the controller. 
export default connect(mapStateToProps)(FailureModal);


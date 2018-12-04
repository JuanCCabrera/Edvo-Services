import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { setLoadingModal } from '../actions/loadingModal';

/**
 * Modal displayed when information is being sent to or received from the database. 
 * @param {*} props - Default properties and language settings
 */
const LoadingModal =(props) => (
    <div className="modal"> 
    {
        //Modal
    }
        <Modal
        isOpen = {props.loadingModal.loadingModalFlag === true}
        onRequestClose = {() => {
            props.dispatch(setLoadingModal());
        }}
        contentLabel="Loading"
        closeTimeoutMS={200}
        className="loading-modal-card" 
        >
        <div className="text-center" style={{padding: '2rem 2rem 1rem 2rem'}}>
        {
            //Spinner (loading) icon
        }
            <span className=""><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>
            <br/>
            <div>
            <br/>
            {
                //"Loading..." message
            }
                <div className="text-center">
                    <div className="card-title font-weight-bold" style={{color: '#5933aa'}}>
                            <div style={{fontSize:'4rem'}}>
                                {props.lang === 'English' ? 'Loading...' : 'Cargando...'}
                            </div> 
                        </div>
                </div>
            </div>
        </div>
        </Modal>
    </div>
);

//Map selected question information, value represeting the question's favorite status and the current language state to the component properties. 
const mapStateToProps = (state) => {
    
    return {
        lang: state.language.lang,
        loadingModal: state.loadingModal
    }
}
//Connect component to the controller. 
export default connect(mapStateToProps)(LoadingModal);


import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

const RecommendationModal = (props) => (
    <Modal
    isOpen = {props.recommendation.recoID !== ''}
    onRequestClose = {props.clearSelectedRecommendation}
    contentLabel="Recommendation"
    >
        <h2>{props.recommendation.title}</h2>
        <h3>{props.recommendation.header}</h3>
        <p>{props.recommendation.description}</p>
        <h4>{props.recommendation.location}</h4>
        <h4>{props.lang === 'English' ? 'Date: ' : 'Fecha: '}{props.recommendation.date}</h4>
        <button onClick = {props.clearSelectedRecommendation}>{props.lang === 'English' ? 'Close' : 'Cerrar'}</button>
    </Modal>
);

const mapStateToProps = (state) => {
    return {
        recommendation: state.teacherRecommendations.selectedRecommendation,
        lang: state.language.lang,
    }
}
export default connect(mapStateToProps)(RecommendationModal);
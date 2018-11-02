import React from 'react';
import {connect} from 'react-redux';
import { removeRecommendation } from '../../actions/recommendations';
import {Link} from 'react-router-dom';

const ManageRecommendationsListItem = (props) => (
    <div>
        <h4>{props.reco.title}</h4>
        <h5>{props.reco.header}</h5>
        <button onClick={() => {
            props.dispatch(removeRecommendation({id: props.reco.id}));
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>

        <Link to={`/recommendations/edit/${props.reco.id}`}><button>{props.lang === 'English' ? 'Edit' : 'Modificar'}</button></Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ManageRecommendationsListItem);
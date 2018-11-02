import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const RecommendationButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/recommendations/assign"}>{props.lang === 'English' ? 'Assign' : 'Asignar'}</Link>
        <br/>
        <Link to={"/recommendations/create"}>{props.lang === 'English' ? 'Create' : 'Crear'}</Link>
        <br/>
        <Link to={"/recommendations/manage"}>{props.lang === 'English' ? 'Manage' : 'Administrar'}</Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecommendationButtonList);
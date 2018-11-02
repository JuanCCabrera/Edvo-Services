import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const MentorButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/mentor/settings/info"}>{props.lang === 'English' ? 'Account Information' : 'Información de Cuenta'}</Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(MentorButtonList);
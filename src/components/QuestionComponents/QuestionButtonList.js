import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const QuestionButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/staff/questions"}>{props.lang === 'English' ? 'View Pending Questions' : 'Ver Preguntas Pendientes'}</Link>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(QuestionButtonList);
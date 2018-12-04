import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const ReturnButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/teacher/recommendations"} style={{textDecoration: 'none'}}>
            <div className="nav__button">
                <div className="nav__button__text" style={{marginBottom: '1rem'}}>
                    {props.lang === 'English' ? 'View Recommendations' : 'Ver Recomendaciones'}
                </div>
            </div>
        </Link>
    </div>
);

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ReturnButtonList);
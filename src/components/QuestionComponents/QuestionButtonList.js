import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * The questions button list contains a link to the Pending Questions page. 
 * @param {*} props - Default properties and the current language state. 
 */
const QuestionButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/staff/questions"} style={{textDecoration: 'none'}}>
            <div className="nav__button nav__button__text">
                    {props.lang === 'English' ? 'View Pending Questions' : 'Ver Preguntas Pendientes'}
            </div>
        </Link>
    </div>
);

//Map current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect the component to the controller. 
export default connect(mapStateToProps)(QuestionButtonList);
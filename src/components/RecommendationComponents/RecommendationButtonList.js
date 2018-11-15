import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * Contains links to traverse the Recommendations Control pages. 
 * @param {*} props - Default properties and current language state. 
 */
const RecommendationButtonList = (props) => (
    <div>
        <br/>
        {
            //Link to the Assign Recommendations page. 
        }
        <Link to={"/recommendations/assign"} style={{textDecoration: 'none'}}>
            <div className="nav__button">
                <p className="nav__button__text">{props.lang === 'English' ? 'Assign' : 'Asignar'}</p>
            </div>
        </Link>
        <br/>
        {
            //Link to the Create Recommendations page. 
        }
        <Link to={"/recommendations/create"} style={{textDecoration: 'none'}}>
            <div className="nav__button">
                <p className="nav__button__text">{props.lang === 'English' ? 'Create' : 'Crear'}</p>
            </div>
        </Link>
        <br/>
        {
            //Link to the Manage Recommendations page. 
        }
        <Link to={"/recommendations/manage"} style={{textDecoration: 'none'}}>
            <div className="nav__button">
                <p className="nav__button__text">{props.lang === 'English' ? 'Manage' : 'Administrar'}</p>
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

//Connect component to controller. 
export default connect(mapStateToProps)(RecommendationButtonList);
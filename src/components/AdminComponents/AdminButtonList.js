import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * Generates a list of three links (Administrator Settings, AppUsers, AppSchools).
 * @param {*} props - Component properties
 */
const AdminButtonList = (props) => (
    <div>
        <br/>
        {
            //Link to Administrator Settings page
        }
            <Link to={"/admin/settings/info"}>
                <div className="nav__button">
                    <p className="nav__button__text">
                        {props.lang === 'English' ? 'My Profile' : 'Mi Perfil'}
                    </p> 
                </div>
            </Link>
        <br/>
        {
            //Link to AppUsers page
        }
        <Link to={"/admin/settings/users"}>
            <div className="nav__button">
                <p className="nav__button__text">
                    {props.lang === 'English' ? 'Users' : 'Usuarios'}
                </p>
            </div>
        </Link>
        <br/>
        {
            //Link to AppSchools page
        }
        <Link to={"/admin/settings/schools"}>
            <div className="nav__button">
                <p className="nav__button__text">
                    {props.lang === 'English' ? 'Institutions' : 'Instituciones'}
                </p>
            </div>
        </Link>
    </div>
);

//Map current language state from the controller to the component properties
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
}
//Connect component to the controller
export default connect(mapStateToProps)(AdminButtonList);
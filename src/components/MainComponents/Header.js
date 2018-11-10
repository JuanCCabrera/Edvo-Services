import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {swapLanguage} from '../../actions/language';

/**
 * Navigation bar located in every page of the application. It contains navigation links to the main page (entry point), About page,
 * Plans page, Edvo Tech's external blog, and Login page. It also contains a button to change the current language state. 
 * @param {*} props - Contains default properties and current language state. 
 */
const Header = (props) => (
    <div className = "navbar header">
        <div className="container-fluid">
            <ul className="nav navbar-nav font-weight-bold">
                {
                    //Link to main page
                }
                <li>
                    <NavLink to="/" activeClassName="is-active" exact={true}>
                        {props.lang === 'English' ? 'Home' : 'Inicio'}
                    </NavLink> 
                </li>
                {
                    //Link to About page
                }
                <li>
                    <NavLink to="/about" activeClassName="is-active">
                        {props.lang === 'English' ? 'About' : 'Acerca De'} 
                    </NavLink>
                </li>
                {
                    //Link to Plans page
                }
                <li>
                    <NavLink to="/plans" activeClassName="is-active">
                        {props.lang === 'English' ? 'Plans' : 'Ofertas'} 
                    </NavLink>
                </li>
                {
                    //Link to Edvo Tech blog
                }
                <li>
                    <a href="https://medium.com/@EdvoTech" target='_blank'>Blog</a>
                </li>

                {
                    //Link to Login page
                }
                <li>
                    <NavLink to="/login" activeClassName="is-active">
                        {props.lang === 'English' ? 'Login' : 'Entrar'} 
                    </NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right font-weight-bold">
            {
                //Swap language button
            }
            <li>
                <div style={{padding: '15px 20px 15px 20px'}} onClick={() => {
                        props.dispatch(swapLanguage());
                    }}>
                    {props.lang === 'English' ? 'Spanish' : 'English'} 
                </div>
            </li>
            {
                //Edvo Tech logo
            }
            <li>
                <div className="logo med-size text-white" style={{marginTop: '0.5rem', marginRight: '20.0rem'}}>
                    <p>edvo</p>
                </div>
            </li>
            </ul>
        </div>
    </div>
);

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};

//Connect component to controller.
export default connect(mapStateToProps)(Header);
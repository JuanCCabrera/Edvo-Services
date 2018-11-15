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
    <div className = "header">
        <div className="container-fluid topnav">
            <ul className="row nav navbar-nav font-weight-bold">
                {
                    //Link to main page
                }
                <li>
                    <NavLink to="/" activeClassName="is-active" exact={true}>
                        <div className="text-white navbar__text">{props.lang === 'English' ? 'Home' : 'Inicio'}</div>
                    </NavLink> 
                </li>
                {
                    //Link to About page
                }
                <li>
                    <NavLink to="/about" activeClassName="is-active">
                        <div className="text-white navbar__text">{props.lang === 'English' ? 'About' : 'Acerca De'} </div>
                    </NavLink>
                </li>
                {
                    //Link to Plans page
                }
                <li>
                    <NavLink to="/plans" activeClassName="is-active">
                        <div className="text-white navbar__text">{props.lang === 'English' ? 'Plans' : 'Ofertas'}</div>
                    </NavLink>
                </li>
                {
                    //Link to Edvo Tech blog
                }
                <li>
                    <a href="https://medium.com/@EdvoTech" target='_blank'>
                        <div className="text-white navbar__text">
                            Blog
                        </div>
                    </a>
                </li>

                {
                    //Link to Login page
                }
                <li>
                    <NavLink className="inactive" activeClassName="active" to="/login">
                        <div className="text-white navbar__text"><p>{props.lang === 'English' ? 'Login' : 'Entrar'}</p> </div>
                    </NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right font-weight-bold">
            {
                //Swap language button
            }
            <li>
                <div className="clickable" style={{padding: '15px 20px 15px 20px'}} onClick={() => {
                        props.dispatch(swapLanguage());
                    }}>
                    {props.lang === 'English' ? 'Español' : 'English'} 
                </div>
            </li>
            {
                //Edvo Tech logo
            }
            <li>
                <div className="logo text-white" style={{marginTop: '0.5rem', marginRight: '10.0rem'}}>
                    <NavLink activeClassName="is-active" to="/" style={{textDecoration: 'none', color: 'white', fontSize: '2.6rem'}}>
                        <div>
                            <p>edvo</p>
                        </div>
                    </NavLink>
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
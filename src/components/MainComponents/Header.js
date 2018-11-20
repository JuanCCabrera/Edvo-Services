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
    <div>
        <div className="nav navbar-inverse header">
            <div className="container-fluid font-weight-bold text-center">
                <ul className="nav navbar-nav navbar__text">
                    {
                        //Link to main page
                    }
                    <li>
                        <NavLink to="/" activeClassName="is-active" exact={true}>
                            <div>{props.lang === 'English' ? 'Home' : 'Inicio'}</div>
                        </NavLink> 
                    </li>
                    {
                        //Link to About page
                    }
                    <li>
                        <NavLink to="/about" activeClassName="is-active">
                            <div>{props.lang === 'English' ? 'About' : 'Acerca De'} </div>
                        </NavLink>
                    </li>
                    {
                        //Link to Plans page
                    }
                    <li>
                        <NavLink to="/plans" activeClassName="is-active">
                            <div>{props.lang === 'English' ? 'Plans' : 'Ofertas'}</div>
                        </NavLink>
                    </li>
                    {
                        //Link to Edvo Tech blog
                    }
                    <li>
                        <a href="https://medium.com/@EdvoTech" target='_blank'>
                            <div>
                                Blog
                            </div>
                        </a>
                    </li>

                    {
                        //Link to Login page
                    }
                    <li>
                        <NavLink className="inactive" activeClassName="active" to="/login">
                            <div><p>{props.lang === 'English' ? 'Login' : 'Entrar'}</p> </div>
                        </NavLink>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right navbar__text">
                    {
                        //Swap language button
                    }
                    <li>
                        <div className="clickable" style={{padding: '9px 20px', marginTop: '0.5rem', marginBottom: '0.5rem'}} onClick={() => {
                                props.dispatch(swapLanguage());
                            }}>
                            <span>{props.lang === 'English' ? 'Español' : 'English'}</span>
                        </div>
                    </li>
                    {
                        //Edvo Tech logo
                    }

                    <li>
                        <NavLink to="/" activeClassName="is-active">
                            <div className="logo" style={{fontWeight: 'normal', fontSize: '2.6rem'}}>{props.lang === 'English' ? 'edvo' : 'edvo'}</div>
                        </NavLink>
                    </li>

                </ul>
            </div>
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
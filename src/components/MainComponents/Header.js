import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {swapLanguage} from '../../actions/language';

const Header = (props) => (
    <div className = "navbar header">
        <div className="container-fluid">
            <ul className="nav navbar-nav font-weight-bold">

                <li>
                    <NavLink to="/" activeClassName="is-active" exact={true}>
                        {props.lang === 'English' ? 'Home' : 'Inicio'}
                    </NavLink> 
                </li>
                
                <li>
                    <NavLink to="/about" activeClassName="is-active">
                        {props.lang === 'English' ? 'About' : 'Acerca De'} 
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/plans" activeClassName="is-active">
                        {props.lang === 'English' ? 'Plans' : 'Ofertas'} 
                    </NavLink>
                </li>

                <li>
                    <a href="https://medium.com/@EdvoTech" target='_blank'>Blog</a>
                </li>

                <li>
                    <NavLink to="/login" activeClassName="is-active">
                        {props.lang === 'English' ? 'Login' : 'Entrar'} 
                    </NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li>
                <div onClick={() => {
                        props.dispatch(swapLanguage());
                    }}>
                    {props.lang === 'English' ? 'Spanish' : 'English'} 
                </div>
            </li>
            <li>
                <div>
                    <h1 className="logo med-size text-white">edvo</h1>
                </div>
            </li>
            </ul>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
export default connect(mapStateToProps)(Header);
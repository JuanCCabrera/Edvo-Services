import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {swapLanguage} from '../../actions/language';

const Header = (props) => (
    <header>
        <NavLink to="/" activeClassName="is-active" exact={true}>
            {props.lang === 'English' ? 'Home' : 'Inicio'}
        </NavLink>
        <NavLink to="/about" activeClassName="is-active">
            {props.lang === 'English' ? 'About' : 'Acerca De'} 
        </NavLink>
        <NavLink to="/plans" activeClassName="is-active">
            {props.lang === 'English' ? 'Plans' : 'Ofertas'} 
        </NavLink>
        <a href="https://medium.com/@EdvoTech" target='_blank'>Blog</a>

        <span onClick={() => {
            props.dispatch(swapLanguage());
        }}>
        {props.lang === 'English' ? 'Spanish' : 'English'} 
        </span>

        <NavLink to="/login" activeClassName="is-active">
            {props.lang === 'English' ? 'Login' : 'Entrar'} 
        </NavLink>
        <span>LOGO_IMG</span>
    </header>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    };
};
export default connect(mapStateToProps)(Header);
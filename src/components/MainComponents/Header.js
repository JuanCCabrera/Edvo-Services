import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {swapLanguage} from '../../actions/language';
import {setAuthentication, setRole} from '../../actions/credentials';
import auth0Client from '../../Auth';

/**
 * Navigation bar located in every page of the application. It contains navigation links to the main page (entry point), About page,
 * Plans page, Edvo Tech's external blog, and Login page. It also contains a button to change the current language state. 
 * @param {*} props - Contains default properties and current language state. 
 */
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    //

    componentWillMount(){
        console.log(!this.props.creds.isAuthenticated && this.props.creds.role == null);
        console.log(!this.props.creds.isAuthenticated);
        console.log(this.props.creds.role == null);

        if(!this.props.creds.isAuthenticated && this.props.creds.role == null){
            if(auth0Client.isAuthenticated()){
                this.props.dispatch(setAuthentication({isAuthenticated: true}));
            }
            if(auth0Client.getRole()!= null){
                this.props.dispatch(setRole(({role: auth0Client.getRole()})));
            }
        }
    }

    render(){

        return(
            <div>
                <div className="nav navbar-inverse header">
                    <div className="container-fluid font-weight-bold text-center">
                        <ul className="nav navbar-nav navbar__text">
                            {
                                //Link to main page
                            }
                        
                            <li>
                                <NavLink to="/" activeClassName="is-active" exact={true}>
                                    <div>{this.props.lang === 'English' ? 'Home' : 'Inicio'}</div>
                                </NavLink> 
                            </li>
                        
                                                    
                                 
                            {
                                //Link to About page
                            }
                            <li>
                                <NavLink to="/about" activeClassName="is-active">
                                    <div>{this.props.lang === 'English' ? 'About' : 'Acerca De'} </div>
                                </NavLink>
                            </li>
                            {
                                //Link to Plans page
                            }
                            <li>
                                <NavLink to="/plans" activeClassName="is-active">
                                    <div>{this.props.lang === 'English' ? 'Plans' : 'Ofertas'}</div>
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
                            
                            {!this.props.isAuthenticated ?
                                <li>
                                    <NavLink className="inactive" activeClassName="active" to="/login">
                                        <div><p>{this.props.lang === 'English' ? 'Login' : 'Entrar'}</p> </div>
                                    </NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink className="inactive" activeClassName="active" to="/login">
                                        <div><p>{this.props.lang === 'English' ? 'Log Out' : 'Salir'}</p> </div>
                                    </NavLink>
                                </li>
                            }
                            
                        </ul>
                        <ul className="nav navbar-nav navbar-right navbar__text">
                            
    
                            {
                                //Dashboard
                            }
                            {this.props.role == "teacher" && 
                            <li>
                                <NavLink to="/teacher/home" activeClassName="is-active" exact={true}>
                                    <div>{this.props.lang === 'English' ? 'Dashboard' : 'Tablero'}</div>
                                </NavLink> 
                            </li>
                            }
                            {this.props.role == "mentor" &&
                                <li>
                                    <NavLink to="/mentor/home" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Dashboard' : 'Tablero'}</div>
                                    </NavLink> 
                                </li>
                            }
                            {this.props.role == "admin" &&
                                <li>
                                    <NavLink to="/admin/home" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Dashboard' : 'Tablero'}</div>
                                    </NavLink> 
                                </li>
                            }
                            {this.props.role == "school" &&
                                <li>
                                    <NavLink to="/school/home" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Dashboard' : 'Tablero'}</div>
                                    </NavLink> 
                                </li>
                            }
    
                            {
                                //Settings and Profile
                            }
                            
                            {this.props.role == "teacher" && 
                                <li>
                                    <NavLink to="/teacher/settings/info" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</div>
                                    </NavLink> 
                                </li>
                            }
                            {this.props.role == "mentor" && 
                                <li>
                                    <NavLink to="/mentor/settings" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</div>
                                    </NavLink> 
                                </li>
                            }
                            {this.props.role == "admin" && 
                                <li>
                                    <NavLink to="/admin/settings/info" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</div>
                                    </NavLink> 
                                </li>
                            }
                            {this.props.role == "school" && 
                                <li>
                                    <NavLink to="/school/settings" activeClassName="is-active" exact={true}>
                                        <div>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</div>
                                    </NavLink> 
                                </li>
                            }

                            {
                                //Swap language button
                            }
                            <li>
                                <div className="clickable" style={{padding: '10px 20px', marginTop: '0.5rem', marginBottom: '0.5rem'}} onClick={() => {
                                        this.props.dispatch(swapLanguage());
                                    }}>
                                    <span>{this.props.lang === 'English' ? 'Español' : 'English'}</span>
                                </div>
                            </li>
                                
                            
                            {
                                //Edvo Tech logo
                            }
    
                            <li>
                                <NavLink to="/" activeClassName="is-active">
                                    <div className="logo" style={{fontWeight: 'normal', fontSize: '2.6rem'}}>{this.props.lang === 'English' ? 'edvo' : 'edvo'}</div>
                                </NavLink>
                            </li>
    
    
                        </ul>
                    </div>
                </div>
            </div>
            );
        }
}
//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
        role: state.credentials.role,
        isAuthenticated: state.credentials.isAuthenticated,
        creds: state.credentials
    };
};

//Connect component to controller.
export default connect(mapStateToProps)(Header);
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * 404 Page Not Found 
 * Shows Navigation Link to main page. 
 */
const NotFoundPage = (props) => (
    <div className="background-home text-center">
        <div className="container">
            <div className="not_found_card">
                <div style={{verticalAlign: 'middle'}}>
                    <span style={{color: '#EED202'}}>
                        <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                    </span>
                    <h1>Error: 404</h1>
                    <h2>{props.lang === 'English' ? 'Page Not Found' : 'Página No Existe'}</h2>
                    <br/>
                        <Link to="/" style={{fontSize: '3rem'}}>
                            <div className="btn btn-item not_found_btn">
                                {props.lang === 'English' ? 'Go Home' : 'Ir a Página Principal'}
                            </div>
                        </Link>
                </div>
            </div>
        </div>
        
    </div>
);

const mapStateToProps = (state) =>{
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(NotFoundPage);
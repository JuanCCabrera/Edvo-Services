import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * List of a single link containing a link to the Mentor Settings page. 
 * @param {*} props - Default properties and current language state. 
 */
const MentorButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/mentor/settings/info"}>{props.lang === 'English' ? 'Account Information' : 'Información de Cuenta'}</Link>
    </div>
);

//Map current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(MentorButtonList);
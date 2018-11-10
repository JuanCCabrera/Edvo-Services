import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';

/**
 * Single item of the User List
 * @param {*} props - User list item information following the object model below:
    user: {
            id: '',
            name: '',
            lastName: '',
            email: '',
            weeklyReco : false,
            categories: []
        }
 */
const UserListItem = (props) => (
    <div>
        {
            //User's full name
        }
        <h4>{props.user.name + ' ' + props.user.lastName}</h4>
        {
            //User's email
        }
        <h5>Email: {props.user.email}</h5>
        {
            //User assignment status
        }
        <h6>{props.lang === 'English' ? 'Has received weekly recommendation' : 'Ha recibido recomendación semanal'}: 
        {props.lang === 'English' ? (props.user.weeklyReco ? ' Yes' : ' No') : (props.user.weeklyReco ? ' Si' : ' No')}</h6>
        {
            //User challenges categories (as filled in registration)
        }
        <h6>{props.lang === 'English' ? 'Categories' : 'Categorías'}: {' '}
        {props.user.categories.map((category) => {
            return (<p key={uuid()}>{category + ' '}</p>)
        })}
        </h6>
        {
            //User removal button
        }
        <button onClick={props.userRemoval}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    </div>
);

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(UserListItem);
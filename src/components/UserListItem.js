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
    <div className="item-card">
        {
            //User's full name
        }
        <p className="item__body card-title">{props.user.name + ' ' + props.user.lastName}</p>
        {
            //User's email
        }
        <p className="item__body">Email: {props.user.email}</p>
        {
            //User assignment status
        }
        <p className="item__body">{props.lang === 'English' ? 'Has received weekly recommendation' : 'Ha recibido recomendación semanal'}: 
        {props.lang === 'English' ? (props.user.weeklyReco ? ' Yes' : ' No') : (props.user.weeklyReco ? ' Si' : ' No')}</p>
        {
            //User challenges categories (as filled in registration)
        }
        <span className="item__body">{props.lang === 'English' ? 'Categories' : 'Categorías'}: {' '}
        {props.user.categories.map((category) => {
            return (<p key={uuid()} className="badge" style={{marginLeft: '1rem', backgroundColor: '#5933AA'}}>{category + ' '}</p>)
        })}
        </span>
        <br/>
        {
            //User removal button
        }
        <button onClick={props.userRemoval}>
            <div className="btn btn-item">
                {props.lang === 'English' ? 'Remove' : 'Remover'}
            </div>
        </button>
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
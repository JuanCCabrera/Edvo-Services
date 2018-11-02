import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';

const UserListItem = (props) => (
    <div>
        <h4>{props.user.name + ' ' + props.user.lastName}</h4>
        <h5>Email: {props.user.email}</h5>
        <h6>{props.lang === 'English' ? 'Has received weekly recommendation' : 'Ha recibido recomendación semanal'}: 
        {props.lang === 'English' ? (props.user.weeklyReco ? ' Yes' : ' No') : (props.user.weeklyReco ? ' Si' : ' No')}</h6>
        <h6>{props.lang === 'English' ? 'Categories' : 'Categorías'}: {' '}
        {props.user.categories.map((category) => {
            return (<p key={uuid()}>{category + ' '}</p>)
        })}
        </h6>
        <button onClick={props.userRemoval}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(UserListItem);
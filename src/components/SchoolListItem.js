import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeSchool} from '../actions/school';

const SchoolListItem = (props) => (
    <div>
        <h4>{props.school.name}</h4>
        <h5>{props.lang === 'English' ? 'Location' : 'Localización'}: {props.school.location}</h5>
        <h5>{props.lang === 'English' ? 'Type' : 'Tipo'}: {props.school.type}</h5>
        <h5>{props.lang === 'English' ? 'Accounts Linked' : 'Cuentas Enlazadas'}: {props.school.numAccounts}</h5>
        <button onClick={() => {
            props.dispatch(removeSchool({id: props.school.id}));
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(SchoolListItem);
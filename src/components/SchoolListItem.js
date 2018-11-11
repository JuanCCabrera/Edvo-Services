import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeSchool} from '../actions/school';
import axios from 'axios';
import auth0Client from '../Auth';

const SchoolListItem = (props) => (
    <div>
        <h4>{props.school.name}</h4>
        <h5>{props.lang === 'English' ? 'Location' : 'Localización'}: {props.school.location}</h5>
        <h5>{props.lang === 'English' ? 'Type' : 'Tipo'}: {props.school.type}</h5>
        <h5>{props.lang === 'English' ? 'Accounts Linked' : 'Cuentas Enlazadas'}: {props.school.numAccounts}</h5>
        <button onClick={() => {
            axios.delete('http://localhost:3000/admin/settings/institutions/remove',{
                
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` },
                data:{institutionid: props.school.id}
        })
            .then(response => {
                console.log("RESPONSE REMOVING SCHOOL: ", response);
                props.dispatch(removeSchool({id: props.school.id}));
            })
            .catch(error=>{
                console.log("ERROR REMOVING SCHOOL: ", error);
            });
        }}>{props.lang === 'English' ? 'Remove' : 'Remover'}</button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(SchoolListItem);
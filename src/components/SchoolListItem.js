import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeSchool} from '../actions/school';
import axios from 'axios';
import auth0Client from '../Auth';

/**
 * Single item of the School List.
 * @param {*} props - School list item information following the object model below
 *
    school: {
            id: '',
            name: '',
            location: '',
            type : '',
            numAccounts: 0
        }
*/

const SchoolListItem = (props) => (
    <div>
        {
            //School name
        }
        <h4>{props.school.name}</h4>
        {
            //School location
        }
        <h5>{props.lang === 'English' ? 'Location' : 'Localización'}: {props.school.location}</h5>
        {
            //School type
        }
        <h5>{props.lang === 'English' ? 'Type' : 'Tipo'}: {props.school.type}</h5>
        {
            //Number of accounts linked to the school
        }
        <h5>{props.lang === 'English' ? 'Accounts Linked' : 'Cuentas Enlazadas'}: {props.school.numAccounts}</h5>
        {
            //Button to remove school from list
        }
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

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to controller. 
export default connect(mapStateToProps)(SchoolListItem);
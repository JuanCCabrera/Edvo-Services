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
    <div className="item-card">
        {
            //School name
        }
        <p className="item__body card-title">{props.school.name}</p>
        {
            //School location
        }
        <p>{props.lang === 'English' ? 'Location' : 'Localización'}: {props.school.location}</p>
        {
            //School type
        }
        <p>{props.lang === 'English' ? 'Type' : 'Tipo'}: {props.school.type}</p>
        {
            //Number of accounts linked to the school
        }
        <span>{props.lang === 'English' ? 'Accounts Linked' : 'Cuentas Enlazadas'}: 
            <div className="badge" style={{marginLeft: '1rem', backgroundColor: '#5933AA'}}>
                {props.school.numAccounts}
            </div>
        </span>
        <br/>
        <br/>

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
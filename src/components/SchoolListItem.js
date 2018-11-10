import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {removeSchool} from '../actions/school';

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
            props.dispatch(removeSchool({id: props.school.id}));
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
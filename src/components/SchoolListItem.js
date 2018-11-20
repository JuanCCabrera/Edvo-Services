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

class SchoolListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toggleButton: false
        }
    }
    
    render(){
        return (
            <div className="item-card">
                {
                    //School name
                }
                <p className="item__body card-title">{this.props.school.name}</p>
                {
                    //School location
                }
                <p>{this.props.lang === 'English' ? 'Location' : 'Localización'}: {this.props.school.location}</p>
                {
                    //School type
                }
                <p>{this.props.lang === 'English' ? 'Type' : 'Tipo'}: {this.props.school.type}</p>
                {
                    //Number of accounts linked to the school
                }
                <span>{this.props.lang === 'English' ? 'Accounts Linked' : 'Cuentas Enlazadas'}: 
                    <div className="badge" style={{marginLeft: '1rem', backgroundColor: '#5933AA'}}>
                        {this.props.school.numAccounts}
                    </div>
                </span>
                <br/>

                {
                    //Button to remove school from list
                }
                {this.state.toggleButton ? 
                    <div>
                        <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                            {this.props.lang === 'English' ? 'Are you sure you would like to remove this user?' : '¿Estás seguro de que quieres remover a este usuario?'}
                        </div>
                        <br/>
                        <button onClick={() => {
                            axios.delete('http://localhost:3000/admin/settings/institutions/remove',{
                
                                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` },
                            data:{institutionid: props.school.id}
                    })
                        .then(response => {
                            console.log("RESPONSE REMOVING SCHOOL: ", response);
                            this.props.dispatch(removeSchool({id: this.props.school.id})); ; 
                            this.setState(() => ({toggleButton: false}));
                        })
                        .catch(error=>{
                            console.log("ERROR REMOVING SCHOOL: ", error);
                        });
                        }}>
                        <div className="btn btn-item" style={{marginTop: '10px'}}>
                                {this.props.lang === 'English' ? 'Yes' : 'Si'}
                        </div>
                        </button>

                        <button onClick={() => {
                            this.setState(() => ({toggleButton: false}));
                        }}>
                        <div className="btn btn-item" style={{marginTop: '10px'}}>
                                {this.props.lang === 'English' ? 'No' : 'No'}
                        </div>
                        </button>
                    </div>
                    :
                    <div>
                    <button onClick={() => {this.setState(() => ({toggleButton: true}))}}>
                        <div className="btn btn-item" style={{marginTop: '10px'}}>
                            {this.props.lang === 'English' ? 'Remove' : 'Remover'}
                        </div>
                    </button>
                    </div>
                }
        
            </div>
        );
    }
}

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
//Connect component to controller. 
export default connect(mapStateToProps)(SchoolListItem);
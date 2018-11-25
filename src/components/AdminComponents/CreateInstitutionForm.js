import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import { setSuccessModal } from '../../actions/successModal';
import { setFailureModal } from '../../actions/failureModal';
import { addSchool } from '../../actions/school';

/**
 * Form to create a new institution and upload it to the database. 
 */
class CreateInstitutionForm extends React.Component{
    constructor(props){
        super(props);
        //An institution must have a name, locaiton, type (public, private, or independent) and an institution ID issued by an Administrator. 
        this.state={
            name: '',
            nameError: '',

            location: '', 
            numAccounts: '',
            locationError: '',

            type: 'public',
            institutionID: '',
            institutionIDError: '',
            numAccountsError: '',

            createInstitutionError: false,
            createInstitutionIncompleteError: false,
            createInstitutionInvalidInputs: false
        };
    }


    onNumberChange = (e) => {
        const numAccounts = e.target.value;
        this.setState(() => ({numAccounts}));
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    //Change type in local state
    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    //Change location in local state
    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({location}));
    }

    //Change institution ID in local state
    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Update the language of the error messages whenever the language is set to change. 
            if(this.props.lang === 'English'){
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'The name field must contain text.'}));
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'Enter a valid address.'}));
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                }
                if(this.state.numAccountsError){
                    this.setState(() => ({numAccountsError: 'Enter a valid number.'}));
                }
            }else{
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'Escriba una dirección física válida.'}))
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Escriba una identificación de institución válida.'}));
                }
                if(this.state.numAccountsError){
                    this.setState(() => ({numAccountsError: 'Escriba un numero valido.'}));
                }
            }
        }
    }
    //
    // createInstitutionError: false,
    //         createInstitutionIncompleteError: false,
    //         createInstitutionInvalidInputs: false

    //Submit Institution information
    onSubmit = (e) => {
        e.preventDefault();        
        if(!this.state.name || !this.state.location){
            this.setState(() => ({createInstitutionError : true})); 
        }else if(this.state.nameError || this.state.locationError || this.state.institutionIDError){
            this.setState(() => ({createInstitutionError: true}));
        }else{
            axios.post('https://beta.edvotech.com/api/admin/settings/institutions/add', {
        name: this.state.name,
        location: this.state.location,
        schooltype: this.state.type,
        institutionid: this.state.institutionID,
        accounts: this.state.numAccounts
            }, {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            })
        .catch(error => {
            if(error.response.status == 403 || error.response.status == 500){
                this.props.dispatch(setFailureModal());
                this.setState(() => ({createInstitutionInvalidInputs: false}));
                this.setState(() => ({createInstitutionError: false}));
            }

                else if(error.response.status == 401){
                    this.setState(() => ({createInstitutionInvalidInputs: true}));
                }
            })
        .then((response)=>{
            if(response.status == 201){              
                this.setState(() => ({createInstitutionError: false}));
                this.props.dispatch(setSuccessModal());
                this.props.history.push('/admin/settings/schools');

            }
        });
        }
        //TO-DO Add new school to database
    }

    //Render form
    render(){
        return(
            <Can
            role={auth0Client.getRole()}
            perform="admin:settings"
            yes={() => (
            <div className="background-home">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-2">
                        <div className="text-center well">
                            {
                                //List of links to traverse Administrator Settings page.
                            }
                            <AdminButtonList/>
                        </div>
                    </div>
                    <div className="col-sm-1"/>
                            
                    <div className="col-sm-9">
                        <div className="big-card ">
                            <form onSubmit={this.onSubmit}>
                            <div>
                                <div className="form__title">
                                    <p>
                                        {this.props.lang === 'English' ? 'Create New Institution' : 'Crear Nueva Institución'}
                                    </p>
                                    
                                    <hr className="break" style={{borderColor: '#5933AA'}}/>
                                </div>
                                <br/>
                                {
                                    //Name input field
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                                <br/>
                                <input className="form-control" maxLength="100" style={{width: '60%'}} type="text" placeholder={this.props.lang === 'English' ? 'Name' : 'Nombre'} onBlur={() => {
                                    //Check if the name field only contains spaces. 
                                    this.setState(() => ({name: this.state.name.trim()}));
                                    if(this.state.name.match(/^\s+$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({nameError: 'The name field must contain text.'}));
                                        }else{
                                            this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'})); 
                                        }
                                    }else{
                                        this.setState(() => ({nameError: ''}));
                                    }
                                }}
                                value={this.state.name} onChange={this.onNameChange}/>
                                {
                                    //Name error
                                }
                                {this.state.nameError && 
                                    <div>
                                        <span className="text-danger"> 
                                            {this.state.nameError}
                                        </span>
                                        <br/>
                                    </div>}
                                <br/>
                                {
                                    //Location input field
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Address' : 'Dirección Física'}:</label> 
                                <br/>
                                <input type="text" className="form-control" maxLength="150" placeholder = {this.props.lang === 'English' ? 'Address' : 'Dirección Física'} onBlur={() => {
                                    //Check if address field is only composed of spaces. 
                                    this.setState(() => ({location: this.state.location.trim()}));
                                    if(this.state.location.match(/^\s+$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({locationError: 'Enter a valid address'}));
                                        }else{
                                            this.setState(() => ({locationError: 'Escriba una dirección física válida.'})); 
                                        }
                                    }else{
                                        this.setState(() => ({locationError: ''}));
                                    }
                                }}
                                value = {this.state.location} onChange={this.onLocationChange}/>

                                {
                                    //Location error
                                }
                                {this.state.locationError && 
                                    <div>
                                        <span className="text-danger"> 
                                            {this.state.locationError}
                                        </span>
                                        <br/>
                                    </div>}
                                <br/>

                                {
                                    //School type radio button selection
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'School Type' : 'Tipo de Escuela'}:</label>
                                <br/>

                                <label className="clickable radio__text"> 
                                    <input type="radio" name="type" value= "public" checked={this.state.type === 'public'} onChange = {this.onTypeChange}/> 
                                    {this.props.lang === 'English' ? ' Public' : ' Pública'}
                                </label>
                                <br/>

                                <label className="clickable radio__text">
                                    <input type="radio" name="type" value= "private" checked={this.state.type === 'private'} onChange = {this.onTypeChange}/> 
                                    {this.props.lang === 'English' ? ' Private' : ' Privada'}
                                </label>
                                <br/>

                                <label className="clickable radio__text">
                                    <input type="radio" name="type" value= "independent" checked={this.state.type === 'independent'} onChange = {this.onTypeChange}/> 
                                    {this.props.lang === 'English' ? ' Independent' : ' Independiente'}
                                </label>

                                <br/>
                                <br/>

                                {
                                    //Number of accounts
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Number of accounts' : 'Cantidad de cuentas'}:</label>
                                <br/>
                                <input type="text" style={{width: '50%'}} maxLength="5" className="form-control" placeholder = {this.props.lang === 'English' ? 'Number of accounts' : 'Cantidad de cuentas'} onBlur={() => {
                                    //Check if institution ID field matches expected format. 
                                    this.setState(() => ({numAccounts: this.state.numAccounts.trim()}));
                                    if(!this.state.numAccounts.match(/^[1-9\|]*$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({numAccountsError: 'Numero invalido'}));
                                        }else{
                                            this.setState(() => ({numAccountsError: 'Invalid number'})); 
                                        }
                                    }else{
                                        this.setState(() => ({numAccountsError: ''}));
                                    }
                                }}
                                value = {this.state.numAccounts} onChange={this.onNumberChange}/>
                                
                                {
                                    //Institution ID error
                                }
                                {this.state.numAccountsError && 
                                    <div>
                                        <span className="text-danger"> 
                                            {this.state.numAccountsError}
                                        </span>
                                        <br/>
                                    </div>}
                                <br/>
                                <br/>

                                {
                                    //Institution ID input field
                                }
                                <span className="req">*</span>
                                <label>{this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'}:</label>
                                <br/>
                                <input type="text" style={{width: '50%'}} maxLength="30" className="form-control" placeholder = {this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'} onBlur={() => {
                                    //Check if institution ID field matches expected format. 
                                    this.setState(() => ({institutionID: this.state.institutionID.trim()}));
                                    if(!this.state.institutionID.match(/^[a-zA-Z0-9\|]*$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                                        }else{
                                            this.setState(() => ({institutionIDError: 'Escriba una identificación de institución valida.'})); 
                                        }
                                    }else{
                                        this.setState(() => ({institutionIDError: ''}));
                                    }
                                }}
                                value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                                {
                                    //Institution ID error
                                }
                                {this.state.institutionIDError && 
                                    <div>
                                        <span className="text-danger"> 
                                            {this.state.institutionIDError}
                                        </span>
                                        <br/>
                                    </div>}
                                <br/>
                                {
                                    //Error displayed if input is missing from required (any) field. 
                                }
                                {this.state.createInstitutionError === true && 
                                    <div className="text-danger" style={{marginBottom: '2.7rem'}}>
                                        {this.props.lang === 'English' ? <p>Please fill all fields with valid information.</p> : <p>Por favor, llene todos los campos con información válida.</p>}
                                    </div>
                                }
                                {
                                    //Submit form button
                                }
                                <button onClick={this.onSubmit}>
                                    <div className="btn btn-item">
                                        {this.props.lang === 'English' ? 'Create' : 'Crear'}
                                    </div>
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
                </div>
     )}
     no={() => <Redirect to="/login" />}
   />);
    }
}

//Map current language state to component properties.
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(CreateInstitutionForm);


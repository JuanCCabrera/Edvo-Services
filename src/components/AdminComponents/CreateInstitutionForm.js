import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import AdminButtonList from './AdminButtonList';
import { connect } from 'react-redux';

/**
 * Form to create a new institution and upload it to the database. 
 */
class CreateInstitutionForm extends React.Component{
    constructor(props){
        super(props);
        //An institution must have a name, locaiton, type (public, private, or independent) and an institution ID issued by an Administrator. 
        this.state={
            name: '',
            location: '', 
            type: 'public',
            institutionID: '',
            createInstitutionError: false
        };
    }

    //Change name in local state
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

    //Submit Institution information
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name || !this.state.location){
            this.setState(() => ({createInstitutionError : true})); 
        }else{
            console.log(this.state);
            this.setState(() => ({createInstitutionError: false}));
            this.props.history.push('/admin/settings/schools');
        }
        //TO-DO Add new school to database
    }

    //Render form
    render(){
        return(
            <div className="background-home">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-2 text-center well">
                            {
                                //List of links to traverse Administrator Settings page.
                            }
                            <AdminButtonList/>
                        </div>
                        <div className="col-sm-1"/>
                            
                        <div className="big-card col-sm-9">
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
                                <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                                <br/>
                                <input className="form-control" style={{width: '60%'}} type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange}/>

                                <br/>
                                {
                                    //Location input field
                                }
                                <label>{this.props.lang === 'English' ? 'Location' : 'Localización'}:</label>
                                <br/>
                                <input type="text" className="form-control" placeholder = "Location" value = {this.state.location} onChange={this.onLocationChange}/>

                                <br/>
                                {
                                    //School type radio button selection
                                }
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
                                    //Institution ID input field
                                }
                                <label>{this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'}:</label>
                                <br/>
                                <input type="text" style={{width: '50%'}} className="form-control" placeholder = "Institution ID" value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>
                            
                                <br/>
                                {
                                    //Error displayed if input is missing from required (any) field. 
                                }
                                {this.state.createInstitutionError === true && 
                                    <div className="text-danger" style={{marginBottom: '2.7rem'}}>
                                        {this.props.lang === 'English' ? <p>Please fill all the blank fields before submitting a new institution.</p> : <p>Por favor, llene todos los campos antes de guardar la institución nueva.</p>}
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
export default connect(mapStateToProps)(CreateInstitutionForm);


import React from 'react';
import {connect} from 'react-redux';
import AdminButtonList from './AdminButtonList';
import {setSuccessModal} from '../../actions/successModal';
import {setFailureModal} from '../../actions/failureModal';
import {setLoadingModal} from '../../actions/loadingModal';
import axios from 'axios';
import auth0Client from '../../Auth';

class CreateCouponForm extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            couponID: '',
            couponIDError: '',

            couponName: '',
            couponNameError: '',

            percentage: '',
            percentageError: '',

            months: '1',

            couponCreationError: false,
            couponRequestError: false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            //Change rendered error message if the language changes. 
            if(this.props.lang === 'English'){
                if(this.state.couponNameError){
                    this.setState(() => ({couponNameError: 'The coupon name field must contain text.'}));
                }
                if(this.state.couponIDError){
                    this.setState(() => ({couponIDError: 'The coupon ID must be alphanumeric and cannot contain spaces.'}));
                }
                if(this.state.percentageError){
                    this.setState(() => ({percentageError: 'The percentage field must contain a number in the range 5-100.'}));
                }
            }else{
                if(this.state.couponNameError){
                    this.setState(() => ({couponNameError: 'El campo del nombre del cupón debe contener texto.'}))
                }
                if(this.state.couponIDError){
                    this.setState(() => ({couponIDError: 'El campo de la identificación del cupón debe ser alfanumérico y no puede contener espacios.'}));
                }
                if(this.state.percentageError){
                    this.setState(() => ({percentageError: 'El campo de porcentaje de descuento debe contener un número en el rango de 5-100.'}));
                }
            }
        }
    }

    onCouponNameChange = (e) => {
        const couponName = e.target.value;
        this.setState(() => ({couponName: couponName}));
    }

    onCouponIDChange = (e) => {
        const couponID = e.target.value;
        this.setState(() => ({couponID: couponID}));
    }

    onPercentageChange = (e) => {
        const percentage = e.target.value;
        if(!percentage.match(/^[0-9]*$/)){
            if(this.props.lang === 'English'){
                this.setState(() => ({percentageError: 'The percentage field must contain a number in the range 5-100.'}));
            }else{
                this.setState(()=> ({percentageError: 'El campo de porcentaje de descuento debe contener un número en el rango de 5-100.'}));
            }
        }else{
            this.setState(() => ({percentage: percentage}));
            this.setState(() => ({percentageError: ''}));
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.couponID || !this.state.couponName || !this.state.percentage){
            this.setState(() => ({couponCreationError: true}));
        }else if(this.state.couponIDError || this.state.couponNameError || this.state.percentageError){
            this.setState(() => ({couponCreationError: true}));
        }else{
            this.props.dispatch(setLoadingModal());
            axios.post('https://beta.edvotech.com/api/admin/settings/coupon/add',{
                            couponid: this.state.couponID,
                            name: this.state.couponName,
                            percentage: this.state.percentage,
                            duration: this.state.months
                },{
                    headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
                }).then(response =>{
                        if(response.status == 200){
                        this.props.dispatch(setSuccessModal())
                        this.setState(() => ({couponID: ''}));
                        this.setState(() => ({couponName: ''}));
                        this.setState(() => ({percentage: ''}));
                        this.setState(() => ({couponRequestError: false, couponCreationError: false}));              
                    }
                    this.props.dispatch(setLoadingModal());
                    })
                    .catch(error => {
                        if(error.response.status != null){
                            this.setState({couponRequestError: true});
                            this.props.dispatch(setFailureModal());
                        }
                        this.props.dispatch(setLoadingModal());
                    })    
                }
    }

    render(){
        return(
            <div className="background-home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="text-center well">
                                <AdminButtonList/>
                            </div>
                        </div>
                        <div className="col-sm-1"/>
                        <div className="col-sm-9">
                            <div className="big-card">
                                {
                                    //Page title
                                }
                                <div className="form__title">
                                    <p> 
                                        {this.props.lang === 'English' ? 'Create Coupon' : 'Crear Cupón'} 
                                    </p>
                                    
                                    <hr className="break" style={{borderColor: '#5933AA'}}/>
                                </div>
                                
                                <form>
                                    <div>
                                        {
                                            //Coupon name input field
                                        }
                                        <span className="req">*</span>
                                        <label>{this.props.lang === 'English' ? 'Coupon Name' : 'Nombre del Cupón'}:</label>
                                        <input type="text" placeholder={this.props.lang === 'English' ? 'Coupon Name' : 'Nombre del Cupón'} style={{width: '50%'}} className="form-control" maxLength="20" onBlur={() => {
                                            //Check if the coupon name field only consists of spaces. 
                                            this.setState(() => ({couponName: this.state.couponName.trim()}));
                                            if(this.state.couponName.match(/^\s+$/)){
                                                if(this.props.lang === 'English'){
                                                    this.setState(() => ({couponNameError: 'The coupon name field must contain text.'}));
                                                }else{
                                                    this.setState(() => ({couponNameError: 'El campo del nombre del cupón debe contener texto.'})); 
                                                }
                                            }else{
                                                this.setState(() => ({couponNameError: ''}));
                                            }
                                        }}
                                        value={this.state.couponName} onChange={this.onCouponNameChange}/>
                                        
                                        {
                                            //Coupon name error
                                        }
                                        {this.state.couponNameError && 
                                            <div>
                                                <span className="text-danger"> 
                                                    {this.state.couponNameError}
                                                </span>
                                                <br/>
                                            </div>}
                                        <br/>

                                        {
                                            //Coupon ID input field
                                        }
                                        <span className="req">*</span>
                                        <label>{this.props.lang === 'English' ? 'Coupon ID Number' : 'Número de Identificación del Cupón'}:</label>
                                        <input type="text" placeholder={this.props.lang === 'English' ? 'ID Number' : 'Número de Identificación'} style={{width: '50%'}} className="form-control" maxLength="10" onBlur={() => {
                                            //Check if the coupon name field only consists of spaces. 
                                            this.setState(() => ({couponID: this.state.couponID.trim()}));
                                            if(this.state.couponID && !this.state.couponID.trim().match(/^[a-zA-Z0-9\|]*$/)){
                                                if(this.props.lang === 'English'){
                                                    this.setState(() => ({couponIDError: 'The coupon ID must be alphanumeric and cannot contain spaces.'}));
                                                }else{
                                                    this.setState(() => ({couponIDError: 'El campo de la identificación del cupón debe ser alfanumérico y no puede contener espacios.'})); 
                                                }
                                            }else{
                                                this.setState(() => ({couponIDError: ''}));
                                            }
                                        }}
                                        value={this.state.couponID} onChange={this.onCouponIDChange}/>
                                        
                                        {
                                            //Coupon name error
                                        }
                                        {this.state.couponIDError && 
                                            <div>
                                                <span className="text-danger"> 
                                                    {this.state.couponIDError}
                                                </span>
                                                <br/>
                                            </div>}
                                        <br/>


                                        {
                                            //Months (duration) selection dropdown list
                                        }
                                        <span className="req">*</span>
                                        <label>{this.props.lang === 'English' ? 'Coupon Duration (Months)' : 'Duración del Cupón (Meses)'}:</label>
                                        <br/>
                                        <div className="btn btn-default">
                                            <select onChange={(e) => {
                                                const months = e.target.value;
                                                this.setState(() => ({months: months}));
                                            }}>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                    <option value='9'>9</option>
                                                    <option value='10'>10</option>
                                                    <option value='11'>11</option>
                                                    <option value='11'>12</option>
                                            </select>
                                        </div>
                                        <br/>
                                        <br/>

                                        {
                                            //Percentage input field
                                        }
                                        <span className="req">*</span>
                                        <label>{this.props.lang === 'English' ? 'Discount Percentage' : 'Porcentaje de Descuento'}:</label>
                                        <br/>
                                        <span style={{color: 'gray', fontSize: '1.5rem'}}>{this.props.lang === 'English' ? 'Please write a number in the range 5-100.' : 'Por favor escriba un número en el rango de 5-100.'}</span>
                                        <br/>
                                        <input type="text" placeholder={this.props.lang === 'English' ? '(5-100)' : '(5-100)'} style={{width: '20%'}} className="form-control" maxLength="3" onBlur={() => {
                                            //Check if the coupon name field only consists of spaces. 
                                            this.setState(() => ({percentage: this.state.percentage.trim()}));
                                            if(this.state.percentage && !this.state.percentage.match(/^[0-9]*$/)){
                                                if(this.props.lang === 'English'){
                                                    this.setState(() => ({percentageError: 'The percentage field must contain a number in the range 5-100.'}));
                                                }else{
                                                    this.setState(() => ({percentageError: 'El campo de porcentaje de descuento debe contener un número en el rango de 5-100.'})); 
                                                }
                                            }else if(this.state.percentage && (Number(this.state.percentage) < 5 || Number(this.state.percentage) > 100)){
                                                
                                                if(this.props.lang === 'English'){
                                                    this.setState(() => ({percentageError: 'The percentage field must contain a number in the range 5-100.'}));
                                                }else{
                                                    this.setState(()=> ({percentageError: 'El campo de porcentaje de descuento debe contener un número en el rango de 5-100.'}));
                                                }
                                            }else{
                                                this.setState(() => ({percentageError: ''}));
                                            }
                                        }}
                                        value={this.state.percentage} onChange={this.onPercentageChange}/>
                                        
                                        {
                                            //Coupon name error
                                        }
                                        {this.state.percentageError && 
                                            <div>
                                                <span className="text-danger"> 
                                                    {this.state.percentageError}
                                                </span>
                                                <br/>
                                            </div>}
                                        <br/>

                                        {
                                            //Error message displayed when field is submitted without having all required fields. 
                                        }
                                        {this.state.couponCreationError === true && 
                                            <div className="text-danger">
                                                {this.props.lang === 'English' ? <p>Please fill all required fields before creating the coupon.</p> : <p>Por favor, llene todos los campos requeridos antes de crear el cupón.</p>}
                                            </div>}
                                        {this.state.couponRequestError === true && 
                                            <div className="text-danger">
                                                {this.props.lang === 'English' ? <p>Coupon is invalid or already exists.</p> : <p>Cupón es invalido o ya existe.</p>}
                                            </div>}


                                        {
                                            //Submit button
                                        }
                                        <button className="btn btn-item" onClick={this.onSubmit}>
                                            <div>
                                                {this.props.lang === 'English' ? 'Submit' : 'Enviar'}
                                            </div>
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(CreateCouponForm);
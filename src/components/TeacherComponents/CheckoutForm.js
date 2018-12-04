import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import {Redirect} from 'react-router-dom';
import {setLoadingModal} from '../../actions/loadingModal';
import {setSuccessModal} from '../../actions/successModal';

/**
 * Payment page. 
 */
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {complete: false, coupon: ''};
        this.submit = this.submit.bind(this);
        //Form asks the user for a coupon ID and credit card information. 
        this.state ={
          coupon: '',
          couponValid: false,
          couponError: '',
          userError: false,
          couponError: false,
          subscriptionError: false   
        }
      }
      onButtonClick = (e) => {
        e.preventDefault();
        this.props.history.replace('/teacher/home')
    }
    //Coupon code validation. 
    onCouponChange = (e) => {
      e.preventDefault();
      const couponCode = e.target.value;
      if(couponCode.length < 8){
          this.setState(() => ({coupon: couponCode, couponValid: false, couponError: 'Coupon is invalid or does not exist.'}));
      }else{
          this.setState(() => ({coupon: couponCode, couponValid: true, couponError: 'Coupon is invalid or does not exist.'}));
      }
  }

  //Submit payment information
  async submit(ev) {
    //Create stripe token
    let {token} = await this.props.stripe.createToken({name: auth0Client.getEmail()});
    if(!token){
      //Mark error if token does not exist. 
      this.setState(() => ({couponError: true}));
    }else{
      this.setState(() => ({couponError: false}));
      //Set loading modal
      this.props.dispatch(setLoadingModal());
    //Post information to database. 
    await axios.post('https://beta.edvotech.com/api/plans/',
        {
            token: token.id,
            plan: 'edvo_basic_capstone',
            couponid: this.state.coupon == '' ? null : this.state.coupon
        },
        {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
          .catch(error => {
            //Set error if user does not exist. 
            if(error.response.status == 401){
              this.setState({userError: true});
              this.setState({couponError: false});
              this.setState({subscriptionError: false});
            }
            //Set error if coupon is invalid. 
            else if(error.response.status == 402){
              this.setState({userError: false});
              this.setState({couponError: true});
              this.setState({subscriptionError: false});
            }
            //Set error if subscription already exists. 
            else if(error.response.status == 403){
              this.setState({userError: false});
              this.setState({couponError: false});
              this.setState({subscriptionError: true});
            }
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal());
        })
          .then(response =>{
            if(response.status == 201){
              //Set redirection in local storage. 
              localStorage.setItem('p-redirect','teacher/settings/plans');
              //Open success modal
              this.props.dispatch(setSuccessModal());
              //Redirect user to teacher home page. 
              this.props.history.replace('/teacher/home')
            }
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal());
          });
        }
  }

  render() {
    return (
      //Authenticate user information to grant access to Payment page. 
      <Can
      role={auth0Client.getRole()}
      perform="teacher:settings"
      yes={() => (
        //Card information input field and header
      <div className="checkout">
        <h4>{this.props.lang === 'English' ? <h4><span style={{color: 'red'}}>*</span>Would you like to complete the purchase?</h4> : <h4><span style={{color: 'red'}}>*</span>¿Desea completar la compra?</h4>}</h4>
        
        {
          //Card information input
        }
        <CardElement />
        <br/>
        {this.props.lang === 'English' ? <h4>Insert a coupon code if you have one:</h4> : <h4>Introduzca un código de cupón si tiene alguno:</h4>}
        <input className="form-control" style={{width: '50%'}} name="coupon" maxLength="30" value={this.state.coupon} placeholder={this.props.lang === 'English' ? 'Insert coupon code here' : 'Introduzca su cupón aqui'} onChange={this.onCouponChange} />
        
        {
          //Error messages
        }
                    {this.state.userError === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>User is invalid.</p> : <p>El usuario no es valido.</p>}
                        </div>
                    }
                    {this.state.couponError === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>Invalid data or coupon.</p> : <p>Datos o cupón inválido(s).</p>}
                        </div>
                    }
                    {this.state.subscriptionError === true && 
                        <div className="text-danger text-center">
                            {this.props.lang === 'English' ? <p>You are already subscribed</p> : <p>Ya esta suscrito.</p>}
                        </div>
                    }
        <div>

      {
        //Pay button
      }
        <button onClick={this.submit}>
          <div className="btn btn-item">
          {this.props.lang === 'English' ? 'Pay' : 'Pagar'}
          </div>
           </button>
        </div>
        <br/>
        {
          //Institutional coupon disclaimer
        }
           <p style={{marginTop: '2rem'}}>{this.props.lang === 'English' ? <p>*If you have an institutional coupon, the subcription fee will not be billed to your card.</p> : <p>*Si posee un cupón institucional, no se le cobrará el costo de suscripción a su tarjeta.</p>}</p>
       
      </div>
        )}
        //Redirect user to login page if not authorized. 
        no={() => <Redirect to="/login" />}
      />
    );
  }
}

//Connect component to stripe. 
export default injectStripe(CheckoutForm);
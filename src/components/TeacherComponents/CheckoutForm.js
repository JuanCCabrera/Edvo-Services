import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import {Redirect} from 'react-router-dom';
import {setSuccessModal} from '../../actions/successModal';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        console.log("EMAIL IN CONSTRUCTOR: ", auth0Client.getEmail);
        this.props = props;
        this.state = {complete: false, coupon: ''};
        this.submit = this.submit.bind(this);
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
    onCouponChange = (e) => {
      e.preventDefault();
      const couponCode = e.target.value;
      if(couponCode.length < 8){
          this.setState(() => ({coupon: couponCode, couponValid: false, couponError: 'Coupon is invalid or does not exists'}));
      }else{
          this.setState(() => ({coupon: couponCode, couponValid: true, couponError: 'Coupon is invalid or does not exists'}));
      }
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: auth0Client.getEmail()});
    console.log("ID TOKEN IN CHECKOUT: ", auth0Client.getIdToken());
    await axios.post('https://beta.edvotech.com/api/plans/',
        {
            token: token.id,
            plan: 'edvo-basic',
            couponid: this.state.coupon
        },
        {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
          .catch(error => {
            if(error.response.status == 401){
              this.setState({userError: true});
              this.setState({couponError: false});
              this.setState({subscriptionError: false});
            }
            
            else if(error.response.status == 402){
              this.setState({userError: false});
              this.setState({couponError: true});
              this.setState({subscriptionError: false});
            }

            else if(error.response.status == 403){
              this.setState({userError: false});
              this.setState({couponError: false});
              this.setState({subscriptionError: true});
            }
        })
          .then(response =>{
            console.log("STRIPE RESPONSE: ",response);
            if(response.status == 201){
              this.props.dispatch(setSuccessModal());
              this.props.history.replace('/teacher/home')
            }
          });
  }

  render() {
    return (
      <Can
      role={auth0Client.getRole()}
      perform="teacher:settings"
      yes={() => (
      <div className="checkout">
        <h4>{this.props.lang === 'English' ? <h4>Would you like to complete the purchase?<span style={{color: 'red'}}>*</span></h4> : <h4>¿Desea completar la compra?<span style={{color: 'red'}}>*</span></h4>}</h4>
        
        <CardElement />
        <br/>
        {this.props.lang === 'English' ? <h4>Do you have a coupon?</h4> : <h4>¿Posee un cupón?</h4>}
        <input className="form-control" style={{width: '50%'}} name="coupon" maxLength="10" value={this.state.coupon} placeholder={this.props.lang === 'English' ? 'Insert coupon code here' : 'Introduzca su cupón aqui'} onChange={this.onCouponChange} />
        
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
                            {this.props.lang === 'English' ? <p>You are already subscribed</p> : <p>Ya esta subscrito</p>}
                        </div>
                    }
        <button onClick={this.submit}>
          <div className="btn btn-item">
          {this.props.lang === 'English' ? 'Pay' : 'Pagar'}
          </div>
           </button>
           <p style={{marginTop: '2rem', color: 'red'}}>{this.props.lang === 'English' ? <p>*If you have an institution coupon, the subcription fee will not be billed to your card.</p> : <p>*Si posee un cupón institucional, no se le cobrará el costo de subscripcion a su tarjeta.</p>}</p>
       
      </div>
        )}
        no={() => <Redirect to="/login" />}
      />
    );
  }
}

export default injectStripe(CheckoutForm);
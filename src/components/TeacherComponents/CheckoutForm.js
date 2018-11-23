import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import {Redirect} from 'react-router-dom';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {complete: false, coupon: ''};
        this.submit = this.submit.bind(this);
      }
      onButtonClick = (e) => {
        e.preventDefault();
        this.props.history.replace('/teacher/home')
    }
    onCouponChange = (e) => {
      e.preventDefault();
      const couponCode = e.target.value;
      if(couponCode.length < 8){
          this.setState(() => ({coupon: couponCode, couponValid: false, couponError: ''}));
      }else{
          this.setState(() => ({coupon: couponCode, couponValid: true, couponError: ''}));
      }
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: auth0Client.getProfile().email});
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
            console.log("STRiPE ERROR: ", error.response.status);
          })
          .then(response =>{
            console.log("STRIPE RESPONSE: ",response);
            if(response.status == 201)
              this.setState({complete: true});
          });
  }

  render() {
    if (this.state.complete){
     return (

       <div>
     <h1>Subscription complete Complete</h1>
     <button onClick={this.onButtonClick}>OK</button>
     </div>
    );
    }
    return (
      <Can
      role={auth0Client.getRole()}
      perform="teacher:settings"
      yes={() => (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <input name="coupon" value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange} />
        <button onClick={this.submit}>Send</button>
      </div>
                                   )}
                                   no={() => <Redirect to="/" />}
                                 />
    );
  }
}

export default injectStripe(CheckoutForm);
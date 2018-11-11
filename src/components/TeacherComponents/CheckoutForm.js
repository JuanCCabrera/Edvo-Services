import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import auth0Client from '../../Auth';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
      }
      onButtonClick = (e) => {
        e.preventDefault();
        this.props.history.replace('/teacher/home')
    }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: auth0Client.getProfile().name});
    console.log("TOKEN IS: ", token.id);
    let response = await axios.post('http://localhost:3000/teacher/pay',
        {
            token: token.id
        },
        {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
          .catch(error => {
            console.log("STRiPE ERROR: ", error);
          })
          .then(response =>{
            console.log("STRIPE RESPONSE: ",response);
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
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <input name="coupon" placeholder="Coupon Code" />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Stripe extends Component {
  constructor(props) {
    super(props);this.state = {
      props: props
    }
  }
  render() {
    return (
      <StripeProvider apiKey="pk_test_ZI69x9fLi6Webd9ERw5RXE8Y">
        <div className="form-group">
          <h1>Subscribe to Edvo Basic Plan</h1>
          <Elements clasName="form-group">
            <CheckoutForm {...this.state.props}/>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Stripe;
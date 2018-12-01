import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { connect } from 'react-redux';
import './Stripe.css';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Stripe extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    axios.get('https://beta.edvotech.com/api/user', {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).then(response => {
      if (response.data.subscription) {
        this.props.history.replace('/teacher/settings/plans');
      }

    })
  }

  render() {
    return (
      <Can
        role={auth0Client.getRole()}
        perform="teacher:settings"
        yes={() => (
          <div className="background-home">
            <div className="container">
              <div className="row">
                <div className="col-sm-3" />
                <div className="col-sm-6">
                  <div className="big-card">
                    <StripeProvider apiKey="pk_live_LQ8GBkPBQ2oBasw3NDDOAtVz">
                      <div>
                        <div className="form__title">
                          <p>{this.props.lang === 'English' ? 'Subscription Payment' : 'Pago de Suscripción'}</p>
                          <hr className="break" style={{ borderColor: '#5933aa' }} />
                        </div>
                        <Elements locale="es">
                          <CheckoutForm {...this.props} />
                        </Elements>
                      </div>
                    </StripeProvider>
                  </div>
                </div>
                <div className="col-sm-3" />
              </div>
            </div>
          </div>
        )}
        no={() => <Redirect to="/login" />}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.language.lang
  }
}

export default connect(mapStateToProps)(Stripe);
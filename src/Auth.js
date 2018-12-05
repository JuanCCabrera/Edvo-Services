import auth0 from 'auth0-js';
import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

/*
  Class  used to handle all authentication functionality, from sign-in and sign-out to register
*/
class Auth {
  constructor(props) {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'edvo-test.auth0.com',
      roleUrl: "https://edvo-test/role",
      clientID: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      redirectUri: 'https://beta.edvotech.com/callback',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getRole = this.getRole.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getSubscribed = this.getSubscribed.bind(this);
    if(localStorage.getItem('p-redirect')==null)
      localStorage.setItem('p-redirect', '/login');
    if(localStorage.getItem('route') == '[object Object]' || localStorage.getItem('route')==null)
      localStorage.setItem('route', '/');
  }

  //Returns the route, if valid, a user was trying to access before logging-in
  getRedirectRoute(){
    return localStorage.getItem('route');
  }
  //Returns the role a user has after being retrieved from the database. Roles are: admin, mentor, teacher and school
  getRole(){
    return localStorage.getItem('role');
  }
  //Returns the email address of the current user
  getEmail(){
    return localStorage.getItem('email');
  }
  //Returns the authentication token used to access the API
  getIdToken() {
    return localStorage.getItem('idToken');
  }
  //Returns the route to pay if the user is not currently subscribed
  getSubscribed(){
    return localStorage.getItem('p-redirect');
  }
  //Receives the token from the Callback component and sends it to the setSession function if successful
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
        }
        if (!authResult || !authResult.idToken) {
          this.signOut();
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }
  //Verifies if token hasn't expired
  isAuthenticated() {
    return new Date().getTime() < localStorage.getItem('expiresAt');
  }
  //Receives token token payloads through the authResult parameter
  setSession(authResult, step) {
    localStorage.setItem('idToken',authResult.idToken);
    localStorage.setItem('email',authResult.idTokenPayload.email);
    localStorage.setItem('expiresAt', authResult.expiresIn * 1000 + new Date().getTime());
    
    axios.get('https://beta.edvotech.com/api/user',  {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      }).then(response =>{ 
      if(response.status == 201){
  }     localStorage.setItem('p-redirect', response.data.subscription != null ? 'teacher/settings/plans' : 'teacher/settings/plans/payment');
      })
      .catch(error => {
        localStorage.setItem('p-redirect', '/login');
      });
  }

  //Returns the Auth0 Universal Login
  signIn() {
    this.auth0.authorize();
  }

  //Returns the Auth0 Universal Signup
  signUp() {
    this.auth0.authorize({
      mode: 'signUp'
    });
  }

  //Terminates the current user session
  signOut() {
    this.auth0.logout({
      returnTo: 'https://beta.edvotech.com/login',
      clientID: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
    });
    localStorage.clear();
  }

  //Function app.js uses to verify if there was a current logged-in session, if there was it refreshes the authentication token
  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

//Class instance
const auth0Client = new Auth();

//Class export
export default auth0Client;

import auth0 from 'auth0-js';
import React from 'react';
import {Redirect} from 'react-router-dom';

class Auth {
  constructor(props) {
    console.log("CONSTRUCTING");
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'edvo-test.auth0.com',
      roleUrl: "https://edvo-test/role",
      clientID: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
      redirectUri: 'http://localhost:8080/callback',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getRole = this.getRole.bind(this);
    this.getEmail = this.getEmail.bind(this);
    if(localStorage.getItem('route') == '[object Object]' || localStorage.getItem('route')==null)
      localStorage.setItem('route', '/');
  }

  getRedirectRoute(){
    return localStorage.getItem('route');
  }
  getRole(){
    return localStorage.getItem('role');
  }

  getEmail(){
    return this.getEmail;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return localStorage.getItem('idToken');
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  isAuthenticated() {
    return new Date().getTime() < localStorage.getItem('expiresAt');
  }

  setSession(authResult, step) {
    if(localStorage.getItem('idToken') == null)
      localStorage.setItem('idToken',authResult.idToken);
    this.profile = {email: authResult.idTokenPayload.email, name: authResult.idTokenPayload.name};
    console.log("THIS PROFILE: ", this.profile);
    this.getEmail = authResult.idTokenPayload.email;  
    //this.getEmail =   
    console.log("EL ROL:::: ",localStorage.getItem('role'));
    console.log("ID PAYLOAD: ",authResult.idToken);
    // set the time that the id token will expire at
    localStorage.setItem('expiresAt', authResult.expiresIn * 1000 + new Date().getTime());
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    console.log("SIGNING OUT!!");
    this.auth0.logout({
      returnTo: 'http://localhost:8080/login',
      clientID: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
    });
    localStorage.clear();
  }

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

const auth0Client = new Auth();

export default auth0Client;

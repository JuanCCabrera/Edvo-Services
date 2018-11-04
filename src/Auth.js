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
    return this.getRole;
  }

  getEmail(){
    return this.getEmail;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
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
    return new Date().getTime() < this.expiresAt;
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.getEmail = authResult.idTokenPayload.email;
    this.getRole = authResult.idTokenPayload["https://edvo-test/role"];  
    //this.getEmail =   
    console.log("EL ROL:::: ",authResult.idTokenPayload["https://edvo-test/role"]);
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    console.log("SIGNING OUT!!");
    this.auth0.logout({
      returnTo: 'http://localhost:8080',
      clientID: 's4PsDxalDqBv79s7oeOuAehCayeItkjN',
    });
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

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
        if (err) {
          console.log("FIRST ERROR handleAuth");
        }
        if (!authResult || !authResult.idToken) {
          console.log("SECOND ERROR handleAuth");
          this.signOut();
          return reject(err);
        }
        this.setSession(authResult);
        console.log("THIRD ERROR handleAuth");
        resolve();
        console.log("FOURTH ERROR handleAuth");
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
    this.getEmail = authResult.idTokenPayload.email;
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

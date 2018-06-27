import auth0 from 'auth0-js';

export default class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'nickrttn.eu.auth0.com',
      clientID: 'p0VH63ASKqolOd1kkFRJDMT9XPM75qan',
      scope: 'openid profile',
      audience: 'https://nickrttn.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/callback'
    });
  }

  parseHash = callback => {
    this.auth0.parseHash((err, result) => {
      if (err) {
        console.log(err);
        callback(false);
        this.logout();
        return;
      }

      this.setToken(result.accessToken);
      callback(true);
    });
  };

  login = () => {
    this.auth0.authorize();
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  };

  setToken = accessToken => {
    // Saves user token to localStorage
    localStorage.setItem('accessToken', accessToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('accessToken');
  };

  logout = () => {
    // Clear user token from localStorage
    localStorage.removeItem('accessToken');

    // Trigger a refresh?
  };
}

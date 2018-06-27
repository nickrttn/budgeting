import { Component, Fragment } from 'react';
import Link from 'next/link';
import Auth0 from '../lib/Auth';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    this.auth = new Auth0();
    this.setState({ loggedIn: this.auth.loggedIn() });
    this.auth.callback = () => {
      this.setState({ loggedIn: this.auth.loggedIn() });
    };
  }

  login = () => this.auth.login();
  logout = () => this.auth.logout();

  render() {
    const loginButton = this.state.loggedIn ? (
      <button onClick={this.logout}>Logout</button>
    ) : (
      <button onClick={this.login}>Login</button>
    );

    return (
      <Fragment>
        <h1>Start budgeting today!</h1>
        {loginButton}
        <Link href="/settings">Settings</Link>
      </Fragment>
    );
  }
}

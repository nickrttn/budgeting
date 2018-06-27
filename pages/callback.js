import { Component } from 'react';
import { withRouter } from 'next/router';
import Auth0 from '../lib/Auth';

class Callback extends Component {
  componentDidMount() {
    const { router } = this.props;
    this.auth = new Auth0();
    this.auth.parseHash(() => {
      router.replace('/');
    });
  }

  render() {
    return null;
  }
}

export default withRouter(Callback);

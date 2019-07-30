import React from 'react';
import getOAuthAuthenticationEndpoint from '../api/getOAuthAuthenticationEndpoint';

export default class extends React.Component {
  static async getInitialProps({ res }) {
    // Redirect to Github OAUTH authentication page.
    res.writeHead(302, {
      Location: getOAuthAuthenticationEndpoint(),
    });
    res.end();
  }
}

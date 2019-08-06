import React from 'react';
import { setCookie } from 'nookies';
import retrieveOAuthAccessToken from '../api/retrieveOAuthAccessToken';

export default class extends React.Component {
  static async getInitialProps(ctx) {
    const { res, query } = ctx;
    const { code } = query;
    const accessToken = await retrieveOAuthAccessToken(code);
    setCookie(ctx, 'token', accessToken);
    res.writeHead(302, {
      Location: '/dashboard',
    });
    res.end();
  }

  render() {
    return (
      <div>
        <pre>Redirecting...</pre>
      </div>
    );
  }
}

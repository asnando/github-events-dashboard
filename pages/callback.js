import React from 'react';
import { setCookie } from 'nookies';
import PageHeader from './PageHeader';
import retrieveOAuthAccessToken from '../api/retrieveOAuthAccessToken';

export default class extends React.Component {
  static async getInitialProps(ctx) {
    const { res, query } = ctx;
    const { code } = query;
    const accessToken = await retrieveOAuthAccessToken(code);
    console.log(`Got access token: "${accessToken}"`);
    setCookie(ctx, 'token', accessToken);
    res.writeHead(302, {
      Location: '/events',
    });
    res.end();
  }

  render() {
    return (
      <div>
        <PageHeader title="Redirecting" />
        <pre>Redirecting...</pre>
      </div>
    );
  }
}

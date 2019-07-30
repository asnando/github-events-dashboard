import React from 'react';
import PageHeader from './PageHeader';
import retrieveOAuthAccessToken from '../oauth/retrieveOAuthAccessToken';

export default class extends React.Component {
  static async getInitialProps({ res, query }) {
    const { code } = query;
    const accessToken = await retrieveOAuthAccessToken(code);
    console.log(accessToken);
    res.writeHead(302, {
      Location: '/events',
    })
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

import React from 'react';
import fetch from 'isomorphic-unfetch'
import PageHeader from './PageHeader';

// export default class extends React.Component {
//   static async getInitialProps({ res }) {
//     res.writeHead(302, {
//       Location: '/events',
//     });
//     res.end();
//   }
// }

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const {
      GITHUB_OAUTH_CLIENT_ID,
      GITHUB_OAUTH_CLIENT_SECRET,
    } = process.env;
    const url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_OAUTH_CLIENT_ID}&client_secret=${GITHUB_OAUTH_CLIENT_SECRET}&code=${query.code}`;
    const res = await fetch(url, { method: 'POST' });
    const json = await res.text();
    console.log(json);
    return { query };
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

// CallbackPage.getInitialProps = ({ query }) => {
//   return { query };
// };

// export default CallbackPage;

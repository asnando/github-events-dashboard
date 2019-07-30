import React from 'react';

const { GITHUB_OAUTH_CLIENT_ID } = process.env;

export default class extends React.Component {
  static async getInitialProps({ res }) {
    // Redirect to Github OAUTH authentication page.
    res.writeHead(302, {
      Location: `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}&scope=user,repo`,
    });
    res.end();
  }
}

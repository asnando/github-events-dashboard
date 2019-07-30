import encodeQueryStringParams from './helpers/encodeQueryStringParams';
import { GITHUB_OAUTH_URL } from './api.config';

const { GITHUB_OAUTH_CLIENT_ID } = process.env;

const getOAuthAuthenticationEndpoint = () => {
  const params = encodeQueryStringParams({
    client_id: GITHUB_OAUTH_CLIENT_ID,
    scope: 'user,repo',
  });
  return `${GITHUB_OAUTH_URL}/authorize?${params}`;
};

export default getOAuthAuthenticationEndpoint;

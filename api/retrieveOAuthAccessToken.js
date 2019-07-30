import fetch from 'isomorphic-unfetch'
import { GITHUB_OAUTH_URL } from './api.config';
import encodeQueryStringParams from './helpers/encodeQueryStringParams';
import decodeParamsStringToObject from './helpers/decodeParamsStringToObject';

const retrieveOAuthAccessToken = async (code) => {
  const {
    GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET,
  } = process.env;

  const params = encodeQueryStringParams({
    client_id: GITHUB_OAUTH_CLIENT_ID,
    client_secret: GITHUB_OAUTH_CLIENT_SECRET,
    code,
  });

  const url = `${GITHUB_OAUTH_URL}/access_token?${params}`;
  const res = await fetch(url, { method: 'POST' });
  const body = await res.text();
  const decodedParams = decodeParamsStringToObject(body);
  const { access_token: accessToken } = decodedParams;
  return accessToken;
};

export default retrieveOAuthAccessToken;

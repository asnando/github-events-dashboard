import fetch from 'isomorphic-unfetch';
import { GITHUB_API_URL } from './api.config';

const getUserInfo = async (githubAccessToken) => {
  const res = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      'Authorization': `token ${githubAccessToken}`,
    }
  });
  const user = await res.json();
  return user;
};

export default getUserInfo;
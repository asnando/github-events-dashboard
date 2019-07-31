import fetch from 'isomorphic-unfetch';
import { GITHUB_API_URL } from './api.config';

const getRepoInfo = async ({ token, repoName }) => {
  const res = await fetch(`${GITHUB_API_URL}/repos/${repoName}`, {
    headers: {
      'Authorization': `token ${token}`,
    }
  });
  const repo = await res.json();
  return repo;
};

export default getRepoInfo;
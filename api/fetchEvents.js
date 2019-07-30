import fetch from 'isomorphic-unfetch';
import { GITHUB_API_URL } from './api.config';
import getUserInfo from './getUserInfo';

const fetchEvents = async (githubAccessToken) => {
  const userInfo = await getUserInfo(githubAccessToken);
  const { login: userName } = userInfo;
  console.log(`Fetching events from "${userName}" user…`);
  const res = await fetch(`${GITHUB_API_URL}/users/${userName}/events`, {
    headers: {
      'Authorization': `token ${githubAccessToken}`,
    }
  });
  return await res.json();
};

export default fetchEvents;
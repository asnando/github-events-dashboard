import fetch from 'isomorphic-unfetch';
import { GITHUB_API_URL } from './api.config';
import getUserInfo from './getUserInfo';

const fetchEvents = async (params) => {
  const { token, user } = params;
  let userName;
  if (!user) {
    const userInfo = await getUserInfo(token);
    userName = userInfo.login;
  } else {
    userName = user.login;
  }
  console.log(`Fetching events from "${userName}" user…`);
  const res = await fetch(`${GITHUB_API_URL}/users/${userName}/events`, {
    headers: {
      'Authorization': `token ${token}`,
    }
  });
  return await res.json();
};

export default fetchEvents;
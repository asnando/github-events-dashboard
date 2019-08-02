import fetch from 'isomorphic-unfetch';
import { GITHUB_API_URL } from './api.config';
import getUserInfo from './getUserInfo';

const fetchEvents = async (params) => {
  const { token, user, page } = params;
  let userName;
  if (!user) {
    const userInfo = await getUserInfo(token);
    userName = userInfo.login;
  } else {
    userName = user.login;
  }
  const res = await fetch(`${GITHUB_API_URL}/users/${userName}/events?page=${page || 1}`, {
    headers: {
      'Authorization': `token ${token}`,
    }
  });

  try {
    const events = await res.json();
    if (!Array.isArray(events)) {
      return [];
    }
    return events;
  } catch (exception) {
    return [];
  }
};

export default fetchEvents;
const transformEventPayload = eventPayload => {
  if (!eventPayload || eventPayload.hasOwnProperty('url')) {
    return null;
  }

  const {
    type: eventType,
    actor,
    payload,
    repo,
    created_at: createdAt,
  } = eventPayload;

  const event = {
    actor: actor.display_login,
    actorAvatar: actor.avatar_url,
    createdAt,
    repoName: repo.name,
    repoUrl: repo.url.replace(/api\./, '').replace(/repos\//, ''),
    cardType: 'repo',
  };

  switch (eventType) {
    case 'PushEvent':
      return {
        ...event,
        cardType: 'push',
        action: 'pushed to',
        commits: payload.commits,
        branch: payload.ref.split('/').pop(),
      };
    case 'ReleaseEvent':
      return {
        ...event,
        action: `released ${payload.release.name} of`,
      };
    case 'CreateEvent':
      return {
        ...event,
        action: `created ${payload.ref_type} ${payload.ref || ''}`,
      };
    case 'WatchEvent':
      return {
        ...event,
        action: 'started watching',
      };
    case 'IssuesEvent':
      return {
        ...event,
        action: `${payload.action} an issue on`,
      };
    case 'ForkEvent':
      return {
        ...event,
        action: `forked`,
      };
    case 'PublicEvent':
      return {
        ...event,
        action: 'made public',
      };
  }
  console.log(`Missing resolver for "${eventType}" event type.`);
  return null;
};

export default transformEventPayload;

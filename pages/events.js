import React from 'react';
import { parseCookies } from 'nookies';
import moment from 'moment';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import fetchEvents from '../api/fetchEvents';
import getRepoInfo from '../api/getRepoInfo';

const transformEventPayload = eventPayload => {
  const { type: eventType, actor, payload, repo, created_at } = eventPayload;

  const event = {
    actor: actor.display_login,
    actorAvatar: actor.avatar_url,
    created_at,
    repoName: repo.name,
    repoUrl: repo.url.replace(/api\./, '').replace(/repos\//, ''),
  };

  switch (eventType) {
    case 'PushEvent':
      return {
        ...event,
        action: 'pushed to',
        commits: payload.commits,
        branch: payload.ref.split('/').pop(),
      };
    case 'ReleaseEvent':
      return {
        ...event,
        action: `released ${payload.name} of`,
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
  }
  console.log(`Missing resolver for "${eventType}" event type.`);
  return null;
};

const RepositoryCard = (props) => {
  const {
    name,
    description,
    url,
    stargazers,
    language,
  } = props;
  return (
    <div className="card">
      <a href={url} target="_blank" className="card-title">{name}</a>
      <div className="card-description">{description}</div>
      {language} - {stargazers}
    </div>
  );
};

const PushResumeCard = (props) => {
  const { commits, branch, actorAvatar } = props;
  const commitsSize = commits.length;
  const commitsMessage = commitsSize > 1 ? 'commits' : 'commit';
  return (
    <div className="card">
      <pre>{commitsSize} {commitsMessage} to <pre className="branch">{branch}</pre></pre>
      {commits.slice(0, 2).map((commit, index) => {
        return (
          <div className="commit" key={index}>
            <div className="actor-avatar">
              <img src={actorAvatar} />
            </div>
            <pre className="commit-hash"></pre>
            <pre className="commit-message">{commit.message}</pre>
          </div>
        );
      })}
      {commitsSize > 2 && (
        <a href="">
          {commitsSize - 2} more commits »
        </a>
      )}
    </div>
  );
};

class EventsPage extends React.Component {
  static async getInitialProps(ctx) {
    const cookies = parseCookies(ctx);
    const { token } = cookies;
    let events = await fetchEvents({ token });
    events = events.map(event => transformEventPayload(event));
    events = events.filter(event => !!event);
    // Fetch repo description and details
    events = await events.map(async (event) => {
      const { repoName } = event;
      const repoInfo = await getRepoInfo({ token, repoName });
      const {
        description: repoDescription,
        stargazers_count: repoStarGazersCount,
        language: repoMainLanguage,
      } = repoInfo;
      return {
        ...event,
        repoDescription,
        repoStarGazersCount,
        repoMainLanguage,
      };
    });
    events = await Promise.all(events);
    return { events };
  }

  renderEventCards() {
    const { events } = this.props;
    return events
      .map((event, index) => {
        const {
          actor,
          actorAvatar,
          created_at,
          repoName,
          repoUrl,
          repoDescription,
          repoStarGazersCount,
          repoMainLanguage,
          action,
          commits,
          branch,
        } = event;
        return (
          <div className="event" key={index}>
            <div className="event-header">
              <div className="actor-avatar">
                <img src={actorAvatar} />
              </div>
              <pre className="event-title">
                <b>{actor}</b> {action} <a href={repoUrl} target="_blank">{repoName}</a> {moment(created_at).fromNow()}
              </pre>
            </div>
            { commits && (
              <PushResumeCard
                name={repoName}
                url={repoUrl}
                commits={commits}
                branch={branch}
                actorAvatar={actorAvatar}
              />
            )}
            { !commits && (
              <RepositoryCard
                name={repoName}
                description={repoDescription}
                stargazers={repoStarGazersCount}
                language={repoMainLanguage}
                url={repoUrl}
              />
            )}
          </div>
        );
      }
      );
  }

  render() {
    // const { events } = this.props;
    // const actorAvatar = events[0].actor.avatar_url;
    // const actorName = events[0].actor.display_login;
    return (
      <div>
        <PageHeader />
        <Header />
        <div className="dashboard">
          {this.renderEventCards()}
          {/* <button className="button">More</button> */}
        </div>
      </div>
    );
  }
}

export default EventsPage;

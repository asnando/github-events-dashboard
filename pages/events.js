import React from 'react';
import { parseCookies } from 'nookies';
import moment from 'moment';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import fetchEvents from '../api/fetchEvents';

const transformEventPayload = eventPayload => {
  console.log(eventPayload);
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
  const { name, description, url } = props;
  return (
    <div className="card">
      <a href={url} target="_blank" className="card-title">{name}</a>
      <div className="card-description">{description}</div>
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
    const events = await fetchEvents({ token });
    return { events };
  }

  renderEventCards() {
    const { events } = this.props;
    return events
      .map(event => transformEventPayload(event))
      .filter(event => !!event)
      .map((event, index) => {
        const {
          actor,
          actorAvatar,
          created_at,
          repoName,
          repoUrl,
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
                url={repoUrl}
                description={""}
              />
            )}
          </div>
        );
      }
      );
  }

  render() {
    const { events } = this.props;
    const actorAvatar = events[0].actor.avatar_url;
    const actorName = events[0].actor.display_login;
    return (
      <div>
        <PageHeader />
        <Header actorAvatar={actorAvatar} actorName={actorName} />
        <div className="dashboard">
          {this.renderEventCards()}
          {/* <button className="button">More</button> */}
        </div>
      </div>
    );
  }
}

export default EventsPage;

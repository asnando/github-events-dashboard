import React from 'react';
import { parseCookies } from 'nookies';
import moment from 'moment';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import RepositoryCard from '../components/RepositoryCard';
import PushResumeCard from '../components/PushResumeCard';
import transformEventPayload from './helpers/transformEventPayload';
import fetchEvents from '../api/fetchEvents';
import getRepoInfo from '../api/getRepoInfo';

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
        repoStarGazersCount: parseInt(repoStarGazersCount),
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
          cardType,
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
                <b>{actor}</b> {action} <a href={repoUrl} className="repo-link" target="_blank">{repoName}</a> <pre className="created-at">{moment(created_at).fromNow()}</pre>
              </pre>
            </div>
            { cardType === 'push' && (
              <PushResumeCard
                name={repoName}
                url={repoUrl}
                commits={commits}
                branch={branch}
                actorAvatar={actorAvatar}
              />
            )}
            { cardType === 'repo' && (
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

  getActorAvatar() {
    const { events } = this.props;
    const { actorAvatar } = events.shift();
    return actorAvatar;
  }

  getActorName() {
    const { events } = this.props;
    const { actor: actorName } = events.shift();
    return actorName;
  }

  render() {
    return (
      <div>
        <PageHeader />
        <Header
          actorAvatar={this.getActorAvatar()}
          actorName={this.getActorName()}
        />
        <div className="dashboard">
          {this.renderEventCards()}
          {/* <button className="button">More</button> */}
        </div>
      </div>
    );
  }
}

export default EventsPage;

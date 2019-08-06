import React from 'react';
import { parseCookies } from 'nookies';
import Header from '../components/Header';
import Event from '../components/Event';
import transformEventPayload from './helpers/transformEventPayload';
import fetchEvents from '../api/fetchEvents';
import getRepoInfo from '../api/getRepoInfo';

class Dashboard extends React.Component {
  static async getInitialProps(ctx) {
    const { query: { page } } = ctx;
    const cookies = parseCookies(ctx);
    const { token } = cookies;

    let events = await fetchEvents({ token, page });

    events = events
      .map(event => transformEventPayload(event))
      .filter(event => !!event);

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

    return {
      events,
      page: parseInt(page) || 1,
    };
  }

  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    this.setState({ ready: true });
  }

  renderEventCards() {
    const { events } = this.props;
    return events.map((event, index) => (
      <Event {...event} key={index} />
    ));
  }

  getActorAvatar() {
    const { events } = this.props;
    try {
      const { actorAvatar } = events.shift();
      return actorAvatar;
    } catch (exception) {
      return null;
    }
  }

  getActorName() {
    const { events } = this.props;
    try {
      const { actor: actorName } = events.shift();
      return actorName;
    } catch (exception) {
      return null;
    }
  }

  render() {
    const { ready } = this.state;

    if (!ready) {
      return null;
    }

    const actorName = this.getActorName();
    const actorAvatar = this.getActorAvatar();

    return (
      <div>
        <Header actorName={actorName} actorAvatar={actorAvatar} />
        <div className="dashboard">
          <div className="dashboard-title">
            All activity
          </div>
          {this.renderEventCards()}
        </div>
        <style jsx>{`
          .dashboard {
            width: 40em;
            padding-top: 5em;
            padding-left: 1em;
          }
          .dashboard-title {
            font-size: 1.25em;
            margin: .5em 0 1em .5em;
          }
        `}</style>
      </div>
    );
  }
}

export default Dashboard;

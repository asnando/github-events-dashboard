import React from 'react';
import { parseCookies } from 'nookies';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import Event from '../components/Event';
import transformEventPayload from './helpers/transformEventPayload';
import fetchEvents from '../api/fetchEvents';
import getRepoInfo from '../api/getRepoInfo';


class EventsPage extends React.Component {
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
    const { events, page } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <PageHeader />
        <Header
          actorAvatar={this.getActorAvatar()}
          actorName={this.getActorName()}
        />
        <div className="dashboard">
          {
            events.length
              ? this.renderEventCards()
              : (
                <h1>Sorry, there is no more events for you 😢.</h1>
              )
          }
          <div className="footer-buttons">
            { events.length && page > 1 && (<a href={`events?page=${page - 1}`}>« Previous</a>)}
            { events.length && (<a href={`events?page=${page + 1}`}>Next »</a>)}
          </div>
        </div>
      </div>
    );
  }
}

export default EventsPage;

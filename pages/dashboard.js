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

  goToNextPage() {
    const { page } = this.props;
    window.location.href = `/dashboard?page=${page + 1}`;
  }

  goToPreviousPage() {
    const { page } = this.props;
    window.location.href = `/dashboard?page=${page - 1}`;
  }

  render() {
    const { ready } = this.state;

    if (!ready) return null;

    const { page, events } = this.props;
    const actorName = this.getActorName();
    const actorAvatar = this.getActorAvatar();

    return (
      <div>
        <Header actorName={actorName} actorAvatar={actorAvatar} />
        <div className="dashboard">
          {
            !events.length
              ? (
                <h1 className="no-events-avaiable">
                  Sorry, there is no more events for you 😢
                </h1>
              )
              : (
                <>
                  <div className="dashboard-title">
                    All activity
                  </div>
                  {this.renderEventCards()}
                  <div
                    className="dashboard-footer"
                    style={ page > 1 ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' } }
                  >
                    { page > 1 && (
                      <button onClick={() => this.goToPreviousPage()}>« Previous</button>
                    )}
                    <button onClick={() => this.goToNextPage()}>Next »</button>
                  </div>
                </>
              )
          }
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
          .dashboard-footer {
            display: flex;
            flex-direction: row;
            padding-top: .5em;
            padding-bottom: 2em;
          }
          .dashboard-footer > button {
            background: #fff;
            border: 1px solid #ccc;
            padding: .5em 1em .5em 1em;
            border-radius: .25em;
            font-size: 1em;
            outline: none;
            cursor: pointer;
            width: 8em;
          }
          .dashboard-footer > button:hover {
            opacity: .5;
          }
          .no-events-avaiable {
            font-size: 1em;
            color: #252525;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Dashboard;

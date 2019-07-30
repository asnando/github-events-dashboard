import React from 'react';
import { parseCookies } from 'nookies';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import getUserInfo from '../api/getUserInfo';
import fetchEvents from '../api/fetchEvents';

class EventsPage extends React.Component {
  static async getInitialProps(ctx) {
    const cookies = parseCookies(ctx);
    const { token } = cookies;
    const user = await getUserInfo(token);
    const events = await fetchEvents({ token, user });
    return { user, events };
  }

  renderEventCards() {
    const { events, user } = this.props;
    const {
      avatar_url: userProfileAvatar,
      login: userName,
    } = user;
    return events.map(({ type }, index) => (
      <div className="event">
        <div className="event-header">
          <div className="user-profile-avatar">
            <img src={userProfileAvatar} />
          </div>
          <div className="event-title">{userName}</div>
        </div>
        <div className="card" key={index}>
          <pre className="card-title">{type}</pre>
        </div>
      </div>
    ));
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <PageHeader />
        <Header />
        <div className="dashboard">
          {this.renderEventCards()}
          <button className="button">More</button>
        </div>
      </div>
    );
  }
}

export default EventsPage;

import React from 'react';
import { parseCookies } from 'nookies';
import PageHeader from './PageHeader';
import Header from '../components/Header';
import fetchEvents from '../api/fetchEvents';

class EventsPage extends React.Component {
  static async getInitialProps(ctx) {
    const cookies = parseCookies(ctx);
    const { token } = cookies;
    const events = await fetchEvents(token);
    return { events };
  }

  renderEventCards() {
    const { events } = this.props;
    return events.map(({ type }, index) => (
      <div className="card" key={index}>
        <pre className="card-title">{type}</pre>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader />
        <Header />
        {this.renderEventCards()}
        <button className="button">More</button>
      </div>
    );
  }
}

export default EventsPage;

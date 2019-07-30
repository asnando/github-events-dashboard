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

  render() {
    const { events } = this.props;
    console.log(events);
    const pvt = events.filter(event => !event.public);
    console.log(pvt);
    return (
      <div>
        <PageHeader />
        <Header />
      </div>
    );
  }
}

export default EventsPage;

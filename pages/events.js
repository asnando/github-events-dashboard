import PageHeader from './PageHeader';
import Header from '../components/Header';

const EventsPage = (props) => {
  const { query } = props;
  return (
    <div>
      <PageHeader />
      <Header />
    </div>
  );
};

export default EventsPage;

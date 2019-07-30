import PageHeader from './PageHeader';

const WelcomePage = () => {
  return (
    <div>
      <PageHeader />
      <div className="welcome">
        <div className="github-icon"></div>
        <div className="github-icon-animated-shadow"></div>
        <pre className="welcome-title">Welcome to Github Events Dashboard!</pre>
        <a href="/authenticate" className="github-authentication-link">Click here to see your events</a>
      </div>
    </div>
  );
};

export default WelcomePage;

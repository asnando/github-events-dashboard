const Header = (props) => {
  const { actorAvatar, actorName } = props;
  return (
    <div className="header">
      <div className="header-left">
        <a className="header-icon" href="/events"></a>
      </div>
      <div className="header-right">
        {/* <a href="https://github.com/ffrm/github-events-dashboard.git" className="link">Fork me</a> */}
        <iframe src="https://ghbtns.com/github-btn.html?user=ffrm&repo=github-events-dashboard&type=fork&count=false&size=small" frameborder="0" scrolling="0" width="158px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=ffrm&repo=github-events-dashboard&type=watch&count=false&size=small" frameborder="0" scrolling="0" width="170px" height="30px"></iframe>
        <a href={`https://github.com/${actorName}`} className="actor-avatar">
          <img src={actorAvatar} />
        </a>
      </div>
    </div>
  );
};

export default Header;

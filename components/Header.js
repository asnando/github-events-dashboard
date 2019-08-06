import PropTypes from 'prop-types';

const Header = (props) => {
  const {
    actorAvatar,
    actorName,
  } = props;
  return (
    <div className="header">
      <div className="header-left">
        <a className="github-icon" href="/dashboard"></a>
      </div>
      <div className="header-right">
        <iframe src="https://ghbtns.com/github-btn.html?user=ffrm&repo=github-events-dashboard&type=fork&count=false&size=small" frameborder="0" scrolling="0" width="96px" height="24px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=ffrm&repo=github-events-dashboard&type=watch&count=false&size=small" frameborder="0" scrolling="0" width="96px" height="24px"></iframe>
        <a href={`https://github.com/${actorName}`} className="actor-avatar">
          <img src={actorAvatar} />
        </a>
      </div>
      <style jsx>{`
        .header {
          position: fixed;
          width: 100%;
          height: 4em;
          display: flex;
          align-items: center;
          background-color: rgb(36,41,46);
          z-index: 999;
        }
        .header-left,
        .header-right {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .header-left {
          backgorund-color: red;
        }
        .header-right {
          justify-content: flex-end;
        }
        .github-icon {
          width: 2em;
          height: 2em;
          margin-left: 1em;
          filter: invert(1);
          background-image: url('/static/github-icon.png');
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .actor-avatar {
          width: 2em;
          height: 2em;
          background-color: red;
          border-radius: .25em;
          margin-right: 1em;
          overflow: hidden;
        }
        .actor-avatar > img {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  actorName: PropTypes.string.isRequired,
  actorAvatar: PropTypes.string.isRequired,
};

export default Header;

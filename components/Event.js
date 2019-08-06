import moment from 'moment';
import PropTypes from 'prop-types'
import PushCard from './PushCard';
import RepoCard from './RepoCard';

const Event = (props) => {
  const {
    actor,
    actorAvatar,
    action,
    repoName,
    repoUrl,
    createdAt,
    cardType,
    commits,
    branch,
    repoDescription,
    repoStarGazersCount,
    repoMainLanguage,
  } = props;
  return (
    <div className="event">
      <div className="event-header">
        <div className="event-actor">
          <div className="event-actor-avatar">
            <img src={actorAvatar} />
          </div>
        </div>
        <div className="event-title">
          <pre className="event-description">
            <a href="#" className="event-actor-name">{actor}</a>
            <pre className="event-action">{action}</pre>
            <a href={repoUrl} target="_blank" className="event-repo-name">{repoName}</a>
            <pre className="created-at"> {moment(createdAt).fromNow()}</pre>
          </pre>
        </div>
      </div>
      <div className="event-content">
        { cardType === 'repo' && (
          <RepoCard
            repoName={repoName}
            repoUrl={repoUrl}
            repoDescription={repoDescription}
            repoStarGazersCount={repoStarGazersCount}
            repoMainLanguage={repoMainLanguage}
          />
        )}
        { cardType === 'push' && (
          <PushCard
            actorAvatar={actorAvatar}
            commits={commits}
            branch={branch}
          />
        )}
      </div>
      <style jsx>{`
        pre, a {
          font-size: .9em;
        }
        .event {
          width: 100%;
          min-height: 10em;
          margin-bottom: 1em;
          border-box: box-sizing;
        }
        .event:not(:last-child) {
          border-bottom: 1px solid #ddd;
        }
        .event-header {
          width: 100%;
          height: 3em;
          display: flex;
          flex-direction: row;
        }
        .event-actor,
        .event-title {
          flex: 1;
          display: flex;
          align-items: center;
        }
        .event-actor {
          justify-content: center;
        }
        .event-actor-avatar {
          overflow: hidden;
          border-radius: .25em;
          width: 2em;
          height: 2em;
        }
        .event-actor-avatar > img {
          width: 100%;
          height: 100%;
        }
        .event-title {
          flex: 11;
        }
        .event-description {
          font-size: 1em;
        }
        .event-description > * {
          display: inline;
        }
        .event-actor-name,
        .event-repo-name {
          color: rgb(36, 41, 46);
          text-decoration: none;
          font-weight: bold;
        }
        .event-action,
        .event-repo-name {
          margin-left: .25em;
        }
        .created-at {
          color: #606060;
        }
        .event-content {
          padding-left: 3.25em;
          padding-bottom: 1em;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

Event.propTypes = {
  actor: PropTypes.string.isRequired,
  actorAvatar: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  repoName: PropTypes.string,
  repoUrl: PropTypes.string,
  createdAt: PropTypes.string,
  cardType: PropTypes.string.isRequired,
  commits: PropTypes.arrayOf([
    PropTypes.object,
  ]),
  branch: PropTypes.string,
  repoDescription: PropTypes.string,
  repoStarGazersCount: PropTypes.number,
  repoMainLanguage: PropTypes.string,
};

export default Event;

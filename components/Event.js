import moment from 'moment';
import RepositoryCard from './RepositoryCard';
import PushResumeCard from './PushResumeCard';

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
        <div className="actor-avatar">
          <img src={actorAvatar} />
        </div>
        <pre className="event-title">
          <b>{actor}</b>
          {` ${action} `}
          <a href={repoUrl} className="repo-link">{repoName}</a>
          <pre className="created-at">{` ${moment(createdAt).fromNow()}`}</pre>
        </pre>
      </div>
      {
        cardType === 'push'
          ? (
            <PushResumeCard
              actorAvatar={actorAvatar}
              commits={commits}
              branch={branch}
            />
          )
          : cardType === 'repo'
            ? (
              <RepositoryCard
              name={repoName}
              description={repoDescription}
              url={repoUrl}
              stargazers={repoStarGazersCount}
              language={repoMainLanguage}
              />
            )
            : null
      }
    </div>
  );
};

export default Event;

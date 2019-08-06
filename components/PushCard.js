import PropTypes from 'prop-types';
import cardStyles from '../styles/card';

const PushCard = (props) => {
  const {
    commits,
    branch,
    actorAvatar
  } = props;

  const numberOfCommits = commits.length;
  const commitMessage = numberOfCommits > 1 ? 'commits' : 'commit';
  const commitsLeft = numberOfCommits > 1 ? numberOfCommits - 1 : 0;

  return (
    <div className="card">
      <pre>{numberOfCommits} {commitMessage} to <a href="#" className="commit-branch">{branch}</a></pre>
      {commits.map((commit, index) => {
        const commitHash = commit.sha.slice(0, 6);
        const { message: commitMessage } = commit;
        return (
          <div className="commit" key={index}>
            <div className="commit-actor-avatar">
              <img src={actorAvatar} />
            </div>
            <div className="commit-hash">
              {commitHash}
            </div>
            <div className="commit-message">
              {commitMessage}
            </div>
          </div>
        );
      })}
      {commitsLeft > 0 && (
        <a href="#" className="missing-commits">{commitsLeft} more commits »</a>
      )}
      <style jsx>{cardStyles}</style>
      <style jsx>{`
        .commit {
          width: 100%;
          height: 2em;
          overflow: hidden;
          margin-bottom: .25em;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .commit-branch {
          background-color: #eaf5ff;
          color: #0366d6;
          padding: .25em .5em;
          border-radius: .25em;
          text-decoration: none;
          font-size: .8em;
        }
        .commit-actor-avatar {
          width: 1.5em;
          height: 1.5em;
          border-radius: .25em;
          overflow: hidden;
        }
        .commit-actor-avatar > img {
          width: 100%;
          height: 100%;
        }
        .commit-hash {
          color: #0366d6;
          font-size: .8em;
          margin-left: .5em;
        }
        .commit-message {
          font-size: .8em;
          margin-left: .5em;
          color: #586069;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 80%;
          white-space: nowrap;
        }
        .missing-commits {
          text-decoration: none;
          font-size: .8em;
          color: #586069;
        }
        .missing-commits:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

PushCard.propTypes = {
  commits: PropTypes.arrayOf([
    PropTypes.object,
  ]).isRequired,
  branch: PropTypes.string.isRequired,
  actorAvatar: PropTypes.string,
};

export default PushCard;

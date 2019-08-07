import PropTypes from 'prop-types';
import cardStyles from '../styles/card';

const PushCard = (props) => {
  const {
    commits,
    branch,
    actorAvatar,
    repoUrl,
  } = props;

  const numberOfCommits = commits.length;
  const commitMessage = numberOfCommits > 1 ? 'commits' : 'commit';
  const commitsLeft = numberOfCommits > 2 ? numberOfCommits - 2 : 0;

  const branchUrl = `${repoUrl}/tree/${branch}`;
  const compareCommitsUrl = commits[0].url
    .replace(/api\./, '')
    .replace(/repos\//, '')
    .replace(/commits/, 'compare');

  return (
    <div className="card">
      <pre>{numberOfCommits} {commitMessage} to <a href={branchUrl} target="_blank" className="commit-branch">{branch}</a></pre>
      {commits.slice(0,2).map((commit, index) => {
        const commitHash = commit.sha.slice(0, 6);
        const { message: commitMessage } = commit;
        const { url } = commit;
        const commitUrl = url
          .replace(/api\./, '')
          .replace(/repos\//, '')
          .replace(/commits/, 'commit');
        return (
          <div className="commit" key={index}>
            <div className="commit-actor-avatar">
              <img src={actorAvatar} />
            </div>
            <a href={commitUrl} target="_blank" className="commit-hash">
              {commitHash}
            </a>
            <div className="commit-message">
              {commitMessage}
            </div>
          </div>
        );
      })}
      {commitsLeft > 0 && (
        <a href={compareCommitsUrl} target="_blank" className="missing-commits">
          {commitsLeft} more commits »
        </a>
      )}
      <style jsx>{cardStyles}</style>
      <style jsx>{`
        pre,
        .commit-hash,
        .commit-message {
          font-size: .8em;
        }
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
          margin-left: .5em;
        }
        .commit-message {
          margin-left: .5em;
          color: #586069;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 80%;
          white-space: nowrap;
        }
        .missing-commits {
          text-decoration: none;
          color: #586069;
          line-height: 0;
          vertical-align: bottom;
          font-size: .9em;
        }
        .missing-commits:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

PushCard.propTypes = {
  commits: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  branch: PropTypes.string.isRequired,
  actorAvatar: PropTypes.string,
  repoUrl: PropTypes.string,
};

export default PushCard;

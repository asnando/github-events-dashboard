import React from 'react';

const PushResumeCard = (props) => {
  const {
    actorAvatar,
    commits,
    branch,
  } = props;

  const commitsSize = commits.length;
  const commitsMessage = commitsSize > 1 ? 'commits' : 'commit';

  return (
    <div className="card push-card">
      <pre>{commitsSize} {commitsMessage} to <pre className="branch">{branch}</pre></pre>
      {commits.slice(0, 2).map((commit, index) => {
        const commitHash = commit.sha.slice(0,7);
        return (
          <div className="commit" key={index}>
            <div className="actor-avatar">
              <img src={actorAvatar} />
            </div>
            <pre className="commit-hash">{commitHash}</pre>
            <pre className="commit-message">{commit.message}</pre>
          </div>
        );
      })}
      {commitsSize > 2 && (
        <a href="">
          {commitsSize - 2} more commits »
        </a>
      )}
    </div>
  );
};

export default PushResumeCard;

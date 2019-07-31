import React from 'react';

const RepositoryCard = (props) => {
  const { name, description, url, stargazers, language } = props;
  return (
    <div className="card repo-card">
      <a href={url} target="_blank" className="repo-name">{name}</a>
      <div className="repo-description">{description}</div>
      <div className="repo-details">
        { language && (
          <pre className="language">{language}</pre>
        )}
        { (stargazers > 0) && (
          <React.Fragment>
            <div className="star-icon"></div>
            <pre className="stargazers">{stargazers}</pre>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default RepositoryCard;

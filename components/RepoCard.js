import PropTypes from 'prop-types';
import cardStyles from '../styles/card';

const RepoCard = (props) => {
  const {
    repoName,
    repoDescription,
    repoUrl,
    repoMainLanguage,
    repoStarGazersCount,
  } = props;

  return (
    <div className="card">
      <a href={repoUrl} className="card-repo-name">{repoName}</a>
      <div className="card-repo-description">{repoDescription}</div>
      <div className="card-repo-footer">
        { repoMainLanguage && (
          <div className="card-repo-language">
            <div className="language-icon"></div>
            <pre>{repoMainLanguage}</pre>
          </div>
        )}
        { repoStarGazersCount > 0 && (
          <div className="card-repo-stargazers">
            <div className="stargazers-icon"></div>
            <pre>{repoStarGazersCount}</pre>
          </div>
        )}
      </div>
      <style jsx>{cardStyles}</style>
      <style jsx>{`
        pre,
        .card-repo-name,
        .card-repo-description {
          font-size: .9em;
        }
        .card-repo-name {
          font-size: 1em;
        }
        .card-repo-language pre,
        .card-repo-stargazers pre {
          font-size: .75em;
        }
        .card-repo-name {
          font-weight: bold;
          text-decoration: none;
          line-height: 3em;
          color: rgb(36,41,46);
        }
        .card-repo-description {
          color: #586069;
        }
        .card-repo-footer {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .card-repo-language,
        .card-repo-stargazers {
          color: #586069;
          display: flex;
          align-items: center;
        }
        .card-repo-stargazers {
          margin-left: 1em;
        }
        .language-icon,
        .stargazers-icon {
          margin: 0 .25em 0 0;
        }
        .language-icon {
          width: .5em;
          height: .5em;
          background-color: purple;
          border-radius: 50%;
        }
        .stargazers-icon {
          width: .8em;
          height: .8em;
          background-image: url('/static/star-icon.svg');
        }
        .card-repo-stargazers > pre {
          height: 1em;
        }
      `}</style>
    </div>
  );
};

RepoCard.propTypes = {
  repoName: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  repoDescription: PropTypes.string.isRequired,
  repoStarGazersCount: PropTypes.number,
  repoMainLanguage: PropTypes.string,
};

export default RepoCard;

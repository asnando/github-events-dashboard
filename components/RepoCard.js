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
        <div className="card-repo-language">
          <div className="language-icon"></div>
          <pre>{repoMainLanguage}</pre>
        </div>
        { repoStarGazersCount > 0 && (
          <div className="card-repo-stargazers">
            <div className="stargazers-icon"></div>
            <pre>{repoStarGazersCount}</pre>
          </div>
        )}
      </div>
      <style jsx>{cardStyles}</style>
      <style jsx>{`
        .card-repo-name {
          font-weight: bold;
          text-decoration: none;
          line-height: 3em;
          color: rgb(36,41,46);
        }
        .card-repo-description {
          color: #586069;
          padding-bottom: 2em;
          font-size: .9em;
        }
        .card-repo-footer {
          width: 100%;
          height: 3em;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          margin-left: .25em; /* Same padding-left as the card content */
        }
        .card-repo-language > pre,
        .card-repo-stargazers > pre {
          height: 1em;
        }
        .card-repo-language,
        .card-repo-stargazers {
          font-size: .8em;
          color: #586069;
          display: flex;
          align-items: center;
        }
        .card-repo-stargazers {
          margin-left: 1em;
        }
        .language-icon,
        .stargazers-icon {
          width: 1.5em;
          height: 1.5em;
          margin: 0 .75em 0 .75em;
        }
        .language-icon {
          width: 1em;
          height: 1em;
          background-color: purple;
          border-radius: 50%;
        }
        .stargazers-icon {
          background-image: url('/static/star-icon.svg');
        }
        pre {
          height: 1.5em;
          font-size: 1.25em;
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

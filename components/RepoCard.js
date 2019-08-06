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
        { repoStarGazersCount && (
          <div className="card-repo-stargazers">
            <div className="stargazers-icon"></div>
            <pre>{repoStarGazersCount}</pre>
          </div>
        )}
      </div>
      <style jsx>{cardStyles}</style>
      <style jsx>{`
        .card-repo-name {
          font-size: 1.1em;
          line-height: 3em;
          font-weight: bold;
          text-decoration: none;
        }
        .card-repo-description {
          font-size: 1em;
        }
        .card-repo-footer {
          width: 100%;
          height: 3em;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
        }
        .card-repo-language,
        .card-repo-stargazers {
          font-size: .8em;
          color: #505050;
          width: 10em;
        }
        .card-repo-language > *,
        .card-repo-stargazers > * {
          display: inline-block;
          text-align: center;
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

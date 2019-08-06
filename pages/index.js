const Welcome = () => {
  return (
    <div>
      <div className="welcome">
        <div className="github-octocat"></div>
        <div className="welcome-title">Welcome to Github Events Dashboard!</div>
        <a href="/authenticate" className="github-authentication-link">
          Click here to see your events »
        </a>
      </div>
      <style jsx>{`
        .welcome {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .github-octocat {
          position: relative;
          width: 20em;
          height: 20em;
          background-image: url('/static/github-octocat.png');
          background-position: center;
          background-size: 100%;
          background-repeat: no-repeat;
          animation: meditate 2s infinite alternate;
          z-index: 2;
          padding-bottom: 10em;
        }
        .github-octocat::after {
          content: '';
          position: absolute;
          bottom: -1.5em;
          background-color: #e5e5e5;
          width: 10em;
          height: 4em;
          left: calc((100% - 10em) / 2);
          border-radius: 50%;
          animation: shadow 2s infinite alternate;
          margin-bottom: 4em;
        }
        .welcome-title {
          font-size: 1.5em;
          color: #252525;
        }
        .github-authentication-link {
          margin-top: 1em;
          outline: none;
          color: #252525;
        }
        @keyframes meditate {
          0% {
            transform: translateY(-1em);
          }
          100% {
            transform: translateY(-2em);
          }
        }
        @keyframes shadow {
          0% {
            transform: scale(.9) translateY(0em);
          }
          100% {
            transform: scale(1.1) translateY(1.5em);
          }
        }
      `}</style>
      <style jsx global>{`
        body {
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #eee;
        }
        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}</style>
    </div>
  );
};

export default Welcome;

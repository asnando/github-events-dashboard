# Github Events Dashboard
See your latest personal Github events.

Access this [Heroku](https://github-events-dashboard.herokuapp.com/) example to preview how it works (<i>may take a time to load the app on the first run</i>).

# Motivation
From Github you can see latest events from another users and if you are part of organization you can see your events from the organization's dashboard. But where to follow with you latest actions on your personal repositories?

Sometimes is interesting to get a resume of what you have been doing on Github, even you knowing what you were working on.

With Github Events Dashboard you can see recent events made by you, mainly in your personal projects.

# Configuration
Before running your custom dashboard we need to set the Github OAuth app keys in a ```.env``` file:
```bash
GITHUB_OAUTH_CLIENT_ID=${YOUR_GITHUB_OAUTH_CLIENT_ID}
GITHUB_OAUTH_CLIENT_SECRET=${YOUR_GITHUB_OAUTH_CLIENT_SECRET}
```

# Running
```bash
npm install
npm run dev/start
```

## 🐳 Running with Docker

#### Building Docker image
```bash
docker build -t ffrm/github-events-dashboard .
```

#### Running the image
```bash
docker run -p 8080:8080 ffrm/github-events-dashboard
```

#### With Compose
```bash
docker-compose build app
docker-compose up
```
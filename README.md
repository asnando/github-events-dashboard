# Github Events Dashboard
See your latest personal Github events.

Access this [Heroku](https://github-events-dashboard.herokuapp.com/) example to preview how it works (<i>it`s running on Heroku and may take a time to load the app on the first run</i>).

# Docker

### Building Docker image
```bash
docker build -t ffrm/github-events-dashboard .
```

### Running the image
```bash
docker run -p 80:8080 ffrm/github-events-dashboard
```

### With Compose
```bash
docker-compose build app
docker-compose up
```
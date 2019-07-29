# Github Events Dashboard
See your latest personal Github events

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
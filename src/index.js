const path = require('path');
const express = require('express');
const package = require('../package.json');

const server = express();

const port = process.env.port || 8080;
const { name: appName } = package;

server
  .use(express.static(path.join(__dirname, '..', 'public')))
  .get('/', (req, res) => {
    return res.sendFile('index.html');
  })
  .listen(port, () => {
    console.log(`Running ${appName} on port: ${port}`);
  });

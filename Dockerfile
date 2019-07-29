FROM node:10
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 8080
CMD [ "npm", "start" ]
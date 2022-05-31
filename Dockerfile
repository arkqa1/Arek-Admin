FROM node:latest

ADD . /komis/
RUN npm install
RUN npm run test
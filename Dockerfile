FROM node:6.3
MAINTAINER Aman Dwivedi dwivedi.aman96@gmail.com
EXPOSE 3000
ARG NPM_TOKEN
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
RUN npm install pino-elasticsearch -g
RUN npm install --production
RUN rm -f .npmrc
CMD ["npm", "start"]
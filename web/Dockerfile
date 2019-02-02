# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:latest

# Install `serve` to run the application.
RUN npm install -g serve

COPY ./build ./build

# CMD serve -s -l 1234 build
# default port is 5000
CMD serve -s build

VOLUME /volume/config
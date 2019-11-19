FROM node:12

# install and cache app dependencies
COPY ./server /app/server
COPY ./build /app/build

WORKDIR /app

EXPOSE 5678

CMD node server/src/index.js

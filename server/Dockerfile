FROM node:12

# install and cache app dependencies
COPY . /app
RUN npm install

WORKDIR /app

EXPOSE 5678

CMD node src/index.js
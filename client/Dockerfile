FROM node:12

WORKDIR /app

# install and cache app dependencies
COPY . /app

RUN  npm -g i parcel
EXPOSE 1234

CMD parcel src/index.html
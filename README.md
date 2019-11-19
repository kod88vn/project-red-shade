# project-red-shade
A dummy project to test my ideas

* Prequisites: `docker` and `parcel`
* `docker-compose up` to spin up infrastructure
* `yarn dev` to start dev mode and server UI at `localhost:5678`
* `node server/scripts/populateBooks.js` to seed some dummy data

# Project highlights
* a simulated bookstore, where user can search for books/author, and edit them
* mongodb to store data, normalized. ElasticSearch to enable quick text search, denormilzed
* nodejs with Express for middleware
* react/redux for front-end
* docker compose to manage infrastructure

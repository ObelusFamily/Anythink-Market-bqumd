# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## Getting Started
1. open a terminal from project folder
1. `docker-compose up`
1. go to `localhost:3000/api/ping`
1. `localhost:3001/register` and register a new user

## adding dummy item
1. start local env
1. `docker exec -it anythink-backend bash` in a new terminal tab
1. cd to backend folder
1. run `./seed.sh`
1. open UI on web browser and make sure a new item with title "title" was created

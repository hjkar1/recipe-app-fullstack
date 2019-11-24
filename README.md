# recipe-app-fullstack
A simple JavaScript app for displaying and searching recipes by title and ingredients. Logged in users can also create, modify and delete recipes.

The app consists of Node/Express/MongoDb REST API server and a React client that uses the API. The client was created with Create React App and uses Redux for state management.

This project combines two previous projects [recipe-app-backend](https://github.com/hjkar1/recipe-app-backend) and [recipe-app-frontend](https://github.com/hjkar1/recipe-app-frontend) as a single repo.
## Prerequisites
You need to have npm and Node.js installed to run this app on your computer.

A MongoDb database is needed to run this app. You can use an external database service or a local database (for development or testing). Different databases can be used in production, development and testing environments.

## Installing
Clone the project and install dependencies:
```
git clone https://github.com/hjkar1/recipe-app-fullstack 
cd recipe-app-fullstack
npm install
```

Use `npm run build` to install and build the client.

## Environment variables
Create a **.env** file in the project root folder.

Define following variables in the **.env** file:
- URIs for the MongoDb databases used in production, development and testing.
- Secret used in generating JSON web tokens for authorization.
- The port used by the API server when developing on localhost.

```
MONGODB_URI='your-production-database-URI'

TEST_MONGODB_URI='your-testing-database-URI'

DEV_MONGODB_URI='your-development-database-URI'

SECRET=your-secret

PORT=3001
```
## Running the app locally
### Backend
Use `npm run watch` to start the server on localhost. The server uses port 3001. The database configured for development environment is used.
### Frontend
```
cd recipe-app-fullstack/client
npm start
```
The frontend starts on localhost and uses port 3000.

## Using ESLint
### Backend
Use `npm run lint` to run ESLint on the backend.
### Full app
Use `npm run lint:full` to run ESLint on both the backend and the frontend.
### Frontend
Using ESLint on the frontend:
```
cd recipe-app-fullstack/client
npm run lint
```

## Testing
Frontend tests include unit and integration tests for React components. 

Backend tests are API integration tests. They use the database configured for test environment. Initializing the tests will clear the database.
### Backend
Use `npm test` to run the tests for the backend.
### Full app
Use `npm run test:full` to run tests for both the backend and the frontend.
### Frontend
Running only the frontend tests:
```
cd recipe-app-fullstack/client
npm test
```

## Deploying to Heroku
A Heroku account is required to deploy this app to Heroku.

Deploying with [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli):

1. Run `heroku create` in the project root folder.

2. Use `npm run deploy` to deploy the app.

3. Set the environment variables needed in production (production database URI and secret for JWTs):
```
heroku config:set MONGODB_URI=your-database-URI
heroku config:set SECRET=your-secret
```

Steps 1 and 3 are needed only on the first deploy. After the app is deployed to Heroku you can deploy a new version by using `npm run deploy`.

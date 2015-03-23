# JSONfilter

A Node.js app using [Express 4](http://expressjs.com/), used .

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

- GET call to YouTube JSON object
- parse JSON into raw JS
- stringify in JS object
- create JSON object using stringified JS
- create express route out of JSON object

- GET call to YouTube JSON object -> returns JSON in a string
- parse JSON string into raw JS object (for example youtubeFeed) using JSON.parse
- make changes as necessary to the JS object
- copy the JS object to another object (for example fmFeed) (fmFeed = youtubeFeed)
- create express route that serves JSON.stringify(fmFeed)
=======
# jsonifier
Simple map of external JSON, filter by key, output to internal JSON route

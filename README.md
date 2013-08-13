Testangular
===========

[![Build Status](https://travis-ci.org/bigpandaio/testangular.png?branch=master)](https://travis-ci.org/bigpandaio/testangular) 

Demo application that shows how to test a simple Angular.js application (login form).

## Pre-requisites:

Node.js: http://nodejs.org/<br>
Grunt-CLI: `npm install -g grunt-cli`<br>
Karma: `npm install -g karma`<br>

## Setup:

Clone the repository: `git clone git@github.com:bigpandaio/testangular.git`<br>
Install dependencies: `npm install`<br>
Run the server: `grunt server`<br>
Run grunt in the background: `grunt`<br>

Browse to [http://localhost:8000](http://localhost:8000) to open the login form.

Changing any of the project's asssets (JS files, Jade files, SAAS files or test files) will run all tests.

## Running tests using standalone Karma

**Note**: before run tests using the Karma runner, one must run `grunt` at least once to create all assets.

Running unit tests: `karma start --auto-watch`<br>
Running e2e tests: `karma start karma-e2e.conf.js --auto-watch`

## Running tests in CI mode (single run):  

With NPM: `npm test`<br>
With Grunt: `grunt test` <br>
With Grunt (only unit tests): `grunt unit` <br>
With Grunt (only e2e tests): `grunt e2e` <br>

## Related Links:

[Mocha](http://visionmedia.github.io/mocha/): Mocha is a JavaScript test framework running on node and the browser.<br>
[Chai](http://chaijs.com/): Chai is a BDD / TDD assertion library for node and the browser.<br>
[Sinon](http://sinonjs.org/): Standalone test spies, stubs and mocks for JavaScript.<br>
[Karma](http://karma-runner.github.io/0.10/index.html): Test Runner of JavaScript. Developed by the Angular.js development team.<br>
[Chai-as-promised](http://chaijs.com/plugins/chai-as-promised): Plugin for writing assertions for promises.<br>
[Sinon-chai](http://chaijs.com/plugins/sinon-chai): Sinon–Chai provides a set of custom assertions for using the Sinon.JS spy, stub, and mocking framework with the Chai assertion library.<br>






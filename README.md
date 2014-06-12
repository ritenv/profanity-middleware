node-profanity-middleware
=========================

A foul-language filter for NodeJS that works seamlessly as a middleware

## Installation

  npm install profanity-middleware --save

## Usage

**As middleware with Express for all routes:**

	var app = express();
	var profanity = require('profanity-middleware');
	...
	//try to keep this the last app.use (optional)
	app.use(profanity.init); //will filter all user input data in all routes

**As middleware with Express for specific routes:**

	var profanity = require('profanity-middleware');
	...
	app.post('/createPost/', *profanity.init*, function(req,res) {
		...
	})

**As function:**

  var profanity = require('profanity-middleware'),
      filter = profanity.filter;

  var html = 'Hello Foul World',
      filtered = filter(html, {blacklist: ['foul']});

  console.log('html', html, 'filtered', filtered);

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
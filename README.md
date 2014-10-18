profanity-middleware
=========================

A foul-language filter for NodeJS that works seamlessly as a middleware.

[![Build Status](https://travis-ci.org/ritenv/profanity-middleware.svg?branch=master)](https://travis-ci.org/ritenv/profanity-middleware)
[![NPM Module](https://badge.fury.io/js/profanity-middleware.svg)](http://badge.fury.io/js/profanity-middleware)

When used as middleware, all data received for the requests are purified automatically. It inserts profanity filters into all routes (or specific ones) to implicitly take care of purification, so you never have to deal with it.

This plugin is built on the assumption that profanity filters need to be implemented implicitly, so you do not have to manually call functions for sanitizing each string (but you can do that too, with this plugin).

## Installation

  npm install profanity-middleware

## Basic Usage

**As middleware with Express for all routes (app middleware):**

    var app = express();
	var profanity = require('profanity-middleware');
	...
	//try to keep this the last app.use (optional)
	app.use(profanity.init); //will filter all user input data in all routes

**As middleware with Express for specific routes (route middleware):**

	var profanity = require('profanity-middleware');
	...
	app.post('/createPost/', profanity.init, function(req,res) {
		...
	});


**As function:**

    var profanity = require('profanity-middleware'),
        filter = profanity.filter;

    var html = 'Hello Foul World',
        filtered = filter(html, {blacklist: ['foul']}); //defining foul as a slang word
    console.log('filtered');
    //Hello f**l world

## Configuration

This plugin supports 2 basic options that can be configured:

	{
		mask: '$', //default '*'
		blacklist: ['foul', 'slang'] //default []
	}

`mask` (optional) is used to filter foul words with a character of your choice; default is asterisk (*)

`blacklist` (optional) is used to define words that you wish to filter in addition to the default dictionary; default is an empty array;

**As middleware**

As middleware, the options are specified just after 'require':

	var profanity = require('profanity-middleware');
	profanity.setOptions({
		mask: '$', 
		blacklist: ['foul', 'slang']
	});
	app.use(profanity.init); //then use it as app middleware or route middleware
	
**As function**

As function, the options are specified when calling the function

	filter(html, {blacklist: ['foul', 'slang']});

## Newly Added

**Profane Words Count**

When used as middleware, the `res` object of the route will be assigned a `profaneWordsCount` which is the count of foul words encountered in that commit.

You can try: `console.log(res.profaneWordsCount)` in any of your route, and can calculate a rating of foulness based on this.

When used as a direct filter function, you can pass in a parameter which will be changed by reference, as below:
`filter(str, {mask: '*', blacklist: ['custom']}, resStub)`
Or:
`filter(str, {}, resStub) //for default options`

The count will be returned in the next line as: `resStub.profaneWordsCount`

**Profane Words Rating**

To count the rating, simply call the rating function as below:

	var profanity = require('profanity-middleware');
	var rating = profanity.rating;
	var filter = profanity.filter;
	var resStub = {}; //if you are getting data from the request object (as middleware), just use the 'res' object
	var badword = filter('enterBadWordHere', {blacklist: ['Bad']}, resStub);
	var computedRating = rating(resStub.profaneWordsCount);
	console.log("Rating of profanity is ", computedRating);


## Tests

  npm test

  - Check for replacing case-sensitive words 
  - Check for not replacing in-string words that could be part of other words 
  - Check for recursively filtering strings inside objects 
  - Check for custom words and custom mask 
  - Check for count of profane words
  - Check rating of profane words

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.2.1 Profane words rating calculator function added
* 0.2.0 Profane word counts added
* 0.1.4 GHOST Enhancement
* 0.1.3 Line breaks Enhancement

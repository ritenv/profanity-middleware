module.exports = new (function() {
	var words = require('./words.json');
	var defaultConfig = {
		mask: '*',
		blacklist: []
	}
	var wordFilter = function(str, res) {

		var originalStr = str;

		str = str.replace(/[^\w\s]/gi, '');

		words = words.concat(defaultConfig.blacklist);
		if (words.indexOf(str.toLowerCase()) >= 0) {
			res.profaneWordsCount++;
			var word = str;
			var wordLen = word.length;
			str = word.substr(0,1) + Array(wordLen-1).join(defaultConfig.mask) + word.substr(wordLen-1,1);
		} else {
			str = originalStr;
		}
		
		return str;
	}
	var doFilter = function(paragraph, res) {
		if (typeof paragraph === 'string') {
			var initTokens = paragraph.split('\n');
			var initTokensLength = initTokens.length;
			for (var j = 0; j < initTokensLength; j++ ) {
				var line = initTokens[j];

				var tokens = line.split(' ');
				var tokensLength = tokens.length;
				for (var i = 0; i < tokensLength; i++ ) {
					tokens[i] = wordFilter(tokens[i], res);
				}
				line = tokens.join(' ');

				initTokens[j] = line;
			}
			paragraph = initTokens.join('\n');
			
			return paragraph;
		} else {
			return paragraph;
		}
	}
	var init = function(req, res, next) {
		res.profaneWordsCount = 0;
		//parse req.body
		for (var i in req.body) {
			var item = req.body[i];
			req.body[i] = filter(item, {}, res);
		}

		//this is a middleware, so announce finished
		next();

	}
	var filter = function(obj, options, res) {
		if (res == undefined)
			res = {profaneWordsCount: 0};
		if (res.profaneWordsCount == undefined)
			res.profaneWordsCount = 0;
		if (options != undefined) {
			defaultConfig.mask = (options.mask != undefined ? options.mask : defaultConfig.mask);
			defaultConfig.blacklist = (options.blacklist != undefined ? options.blacklist : defaultConfig.blacklist);
		}

		if (typeof obj === "object") {
			for (var key in obj) {
				if (typeof obj[key] === "object")
					obj[key] = filter(obj[key], options, res);
				else if (typeof obj[key] !== "function")
					obj[key] = doFilter(obj[key], res);

			}
		} else if (typeof obj === "string")
			obj = doFilter(obj, res);
		return obj;
	}
	var setOptions = function(options) {
		if (options != undefined) {
			defaultConfig.mask = (options.mask != undefined ? options.mask : defaultConfig.mask);
			defaultConfig.blacklist = (options.blacklist != undefined ? options.blacklist : defaultConfig.blacklist);
		}
	}
	var rating = function(profaneWordsCount) {
		//50 bad words means 100% rating
		var calculatedRate = (profaneWordsCount / 50) * 100;
		return calculatedRate;
	}
	this.rating = rating;
	this.init = init;
	this.filter = filter;
	this.setOptions = setOptions;
})();
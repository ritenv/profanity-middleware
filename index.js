module.exports = new (function() {
	var words = require('./words.json');
	var defaultConfig = {
		mask: '*',
		blacklist: []
	}
	var wordFilter = function(str) {

		var originalStr = str;

		str = str.replace(/[^\w\s]/gi, '');

		words = words.concat(defaultConfig.blacklist);
		if (words.indexOf(str.toLowerCase()) >= 0) {
			var word = str;
			var wordLen = word.length;
			str = word.substr(0,1) + Array(wordLen-1).join(defaultConfig.mask) + word.substr(wordLen-1,1);
		} else {
			str = originalStr;
		}
		
		return str;
	}
	var doFilter = function(paragraph) {
		if (typeof paragraph === 'string') {
			var tokens = paragraph.split(' ');
			for (var i = 0; i < tokens.length; i++ ) {
				tokens[i] = wordFilter(tokens[i]);
			}
			paragraph = tokens.join(' ');
			return paragraph;
		}
	}
	var init = function(req, res, next) {

		//parse req.body
		for (var i in req.body) {
			var item = req.body[i];
			req.body[i] = filter(item);
		}

		//this is a middleware, so announce finished
		next();

	}
	var filter = function(obj, options) {
		if (options != undefined) {
			defaultConfig.mask = (options.mask != undefined ? options.mask : defaultConfig.mask);
			defaultConfig.blacklist = (options.blacklist != undefined ? options.blacklist : defaultConfig.blacklist);
		}

		if (typeof obj === "object") {
			for (var key in obj) {
				if (typeof obj[key] === "object")
					obj[key] = recurse(obj[key]);
				else if (typeof obj[key] !== "function")
					obj[key] = doFilter(obj[key]);

			}
		} else if (typeof obj === "string")
			obj = doFilter(obj);
		return obj;
	}

	this.init = init;
	this.filter = filter;
})();
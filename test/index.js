var should = require('chai').should(),
	profanity = require('../index'),
	filter = profanity.filter;

describe('#filter', function() {
	var str = 'Fucking shit happens many a times to him because he is such an ass';
	var filteredStr = 'F*****g s**t happens many a times to him because he is such an a*s';
	it('Check for replacing case-sensitive words', function() {
		filter(str).should.equal(filteredStr);
	});
	

	var str2 = 'It was a mind-blowing experience with Moshito, when nothing was replaced from his name!';
	var filteredStr2 = 'It was a mind-blowing experience with Moshito, when nothing was replaced from his name!';
	it('Check for not replacing in-string words that could be part of other words', function() {
		filter(str2).should.equal(filteredStr2);
	});


	var str3 = { str: 'Fucking shit happens many a times to him because he is such an ass' };
	var filteredStr3 = { str: 'F*****g s**t happens many a times to him because he is such an a*s'};
	it('Check for recursively filtering strings inside objects', function() {
		filter(str3).str.should.equal(filteredStr3.str);
	});

	var str4 = 'Replacing additional words with custom mask character!';
	var filteredStr4 = 'Replacing additional words with c$$$$m mask character!';
	it('Check for custom words and custom mask', function() {
		filter(str4, {mask: '$', blacklist: ['custom']}).should.equal(filteredStr4);
	});
	/*
	it('converts shit shit to s*** s***', function() {
		filter(' shit shit ').should.equal(' s*** s*** ');
	});
	it('converts asshole to a******', function() {
		filter(' asshole ').should.equal(' a****** ');
	});
	
	it('doesn\'t convert moshito even if it contains shit', function() {
		filter(' moshito ').should.equal(' moshito ');
	});
	it('converts bastard to b******', function() {
		filter(' bastard ').should.equal(' b****** ');
	});
	it('converts fuck to f***', function() {
		filter(' fuck ').should.equal(' f*** ');
	});
	it('converts fucking to f***ing', function() {
		filter('fucking').should.equal('f***ing');
	});
	it('converts cawk to c***', function() {
		filter(' cawk ').should.equal(' c*** ');
	});
	*/
});
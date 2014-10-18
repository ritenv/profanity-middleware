var should = require('chai').should(),
	profanity = require('../index'),
	filter = profanity.filter,
	rating = profanity.rating;

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


	var str3 = { wrapper: { str: 'Fucking shit happens many a times to him because he is such an ass' } };
	var filteredStr3 = { wrapper: { str: 'F*****g s**t happens many a times to him because he is such an a*s'} };
	it('Check for recursively filtering strings inside objects', function() {
		filter(str3).wrapper.str.should.equal(filteredStr3.wrapper.str);
	});


	var str4 = 'Replacing additional words with custom mask character!';
	var filteredStr4 = 'Replacing additional words with c$$$$m mask character!';
	it('Check for custom words and custom mask', function() {
		filter(str4, {mask: '$', blacklist: ['custom']}).should.equal(filteredStr4);
	});

	var str5 = 'Fucking shit happens many a times to him because he is such an ass';
	var filteredStr5 = 'F*****g s**t happens many a times to him because he is such an a*s';
	it('Checking count of profane words', function() {
		var resStub = {};
		filter(str, {mask: '*', blacklist: ['custom']}, resStub).should.equal(filteredStr);
		resStub.profaneWordsCount.should.equal(3);
	});

	var str6 = 'Fucking shit happens many a times to him because he is such an ass';
	var filteredStr6 = 'F*****g s**t happens many a times to him because he is such an a*s';
	it('Checking rating of profane words', function() {
		var resStub = {};
		filter(str, {mask: '*', blacklist: ['custom']}, resStub).should.equal(filteredStr);
		resStub.profaneWordsCount.should.equal(3);
		rating(resStub.profaneWordsCount).should.equal(6); //3 bad words meaning it is 6% foul
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
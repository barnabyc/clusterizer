var clusterizer = require('../lib'),
    c;

describe('clusterizer', function () {
	beforeEach(function () {
		c = clusterizer.init();
	});

	describe('initialization', function () {
    it('has an init method', function () {
      expect( typeof clusterizer.init ).toBe( 'function' );
    });
		it('returns successfully', function () {
			expect( clusterizer instanceof require('../lib/clusterizer') ).toBeTruthy();
		});
	});
});


'use strict';

describe('filter:capitalizeFirstLetter', function() {
    var  createCapitalizeFirstLetterFilter;

    beforeEach(module('tmwFilters'));

    beforeEach(inject(function($filter) {
        createCapitalizeFirstLetterFilter = function() {
            return $filter('capitalizeFirstLetter');
        };
    }));

    describe('test string capitalization', function () {
        it('"type" first letter should be capitalized', function() {
            var filter = createCapitalizeFirstLetterFilter();
            filter('type').should.equal('Type');
        });
        it('should return an empty string if an invalid value is passed in', function() {
          var filter = createCapitalizeFirstLetterFilter();
          filter(null).should.equal('');
        });
    });
});



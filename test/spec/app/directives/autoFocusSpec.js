'use strict';
describe('directive: auto-focus', function() {
    var $compile;
    var scope;

    beforeEach(module('tmwDirectives'));
    beforeEach(inject(function (_$compile_) {
        $compile = _$compile_;
        scope = {};
    }));

    it('should replace the directive with the template', function() {
        var html = angular.element(document.body)
          .append('<input id="first"  /> <input id = "second" auto-focus />');
        $compile(html)(scope);
        document.activeElement['id'].should.equal('second');
    });
});


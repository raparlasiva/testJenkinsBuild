'use strict';

describe('directive:tablePagination', function() {
    var compile, scope, directiveElem;

    beforeEach(function(){
        module('tmwDirectives');

        inject(function($compile, $rootScope){
            compile = $compile;
            scope = $rootScope.$new();
            scope.paginationChanged = sinon.stub();
        });

        directiveElem = getCompiledElement();
    });

    function getCompiledElement(hits) {
        var totalHits = hits || 999;
        var element = angular.element('<table-pagination total-hits="'+ totalHits.toString() + '" ' +
        'current-clicked-page="1" pagination-changed="ctrl.paginationChanged(newPage)"></table-pagination>');

        var compiledDirective = compile(element)(scope);
        scope.$digest();
        return compiledDirective;
    }

    describe('Test the isolateScope properties', function() {
        it('isolated scope should have the two properties and one method defined by default', function(){
            var isolatedScope = directiveElem.eq(0).isolateScope();
            assert.isDefined(isolatedScope.currentClickedPage);
            assert.isDefined(isolatedScope.totalHits);
            assert.isDefined(isolatedScope.paginationChanged);
            assert.isFunction(isolatedScope.paginationChanged);
        });

        it('test isolated scope property values', function(){
            var isolatedScope = directiveElem.isolateScope();
            isolatedScope.currentClickedPage.should.equal(1);
            isolatedScope.totalHits.should.equal(999);
        });
    });

    describe('Test directive markup visibility', function() {
        it('should hide the markup when the total hits are less than 10', function() {
            var element = getCompiledElement(5).eq(0);
            element.find('div').hasClass('ng-hide').should.equal(true);
        });

        it('should show the markup when the total hits are greater than 10', function() {
            var element = getCompiledElement(15).eq(0);
            element.find('div').hasClass('ng-hide').should.equal(false);
        });
    });
});



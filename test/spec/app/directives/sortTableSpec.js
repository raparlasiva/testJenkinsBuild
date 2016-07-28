'use strict';

describe('directive:sortTable', function() {
  var compile, scope, directiveElem;

  beforeEach(function(){
    module('tmwDirectives', 'views/sortTable.html');

    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
      scope.svcCall = sinon.stub();
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement () {
    var element = angular.element('<tr><th sort-table order="colOne" svc-call="svcCall(params)">colNameOne</th><th sort-table order="colTwo" svc-call="svcCall(params)">colNameTwo</th></tr>');

    var compiledDirective = compile(element.children())(scope);
    scope.$digest();
    return compiledDirective;
  }
  describe('Test the transclude', function () {
    it('should have an ng-transclude directive in it', function () {
      directiveElem.eq(0).find('ng-transclude').length.should.equal(1);
      directiveElem.eq(1).find('ng-transclude').length.should.equal(1);
    });

    it('should have the transcluded content', function () {
      directiveElem.eq(0).find('ng-transclude')[0].innerText.should.equal('colNameOne');
      directiveElem.eq(1).find('ng-transclude')[0].innerText.should.equal('colNameTwo');
    });
  });

  describe('Test the isolateScope properties', function () {
    it('isolated scope should have the two properties defined by default', function(){
      var isolatedScope = directiveElem.eq(0).isolateScope();
      assert.isDefined(isolatedScope.order);
      assert.isDefined(isolatedScope.svcCall);
    });

    it('order on isolated scope should equal colOne', function(){
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.order.should.equal('colOne');
    });

    it('svcCall should be a function', function(){
      var isolatedScope = directiveElem.isolateScope();
      assert.isFunction(isolatedScope.svcCall)
    });
  });

  describe('Test the element cursor ', function () {
    it('should have an ng-transclude directive in it', function () {
      directiveElem[0].style.cursor.should.equal('pointer');
      directiveElem[1].style.cursor.should.equal('pointer');
    });
  });

  describe('Test the ascending/descending class on multiple elements', function () {
    it('should display asending/descending classes only when element is clicked -', function () {
      // when first element is clicked for the first time- Ascending
      directiveElem.eq(0).triggerHandler('click');
      scope.$apply();
      directiveElem.eq(0).isolateScope().by.should.equal('colOne');
      directiveElem.eq(0).isolateScope().reverse.should.equal(false);
      directiveElem.eq(0).isolateScope().sortType.should.equal('');
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(true);

      //when second element is clicked for the first time- Ascending
      directiveElem.eq(1).triggerHandler('click');
      scope.$apply();
      directiveElem.eq(0).isolateScope().by.should.equal('colOne');
      directiveElem.eq(0).isolateScope().reverse.should.equal(false);
      directiveElem.eq(0).isolateScope().sortType.should.equal('');
      directiveElem.eq(1).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(true);
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(false);

      //when first element is clicked again - Descending
      directiveElem.eq(0).triggerHandler('click');
      scope.$apply();
      directiveElem.eq(0).isolateScope().by.should.equal('colOne');
      directiveElem.eq(0).isolateScope().reverse.should.equal(true);
      directiveElem.eq(0).isolateScope().sortType.should.equal('-');
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-desc').should.equal(true);
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(false);
      directiveElem.eq(1).find('span').eq(1).hasClass('fa fa-sort-desc').should.equal(false);

      //when second element is clicked again - Descending
      directiveElem.eq(1).triggerHandler('click');
      scope.$apply();
      directiveElem.eq(1).isolateScope().by.should.equal('colTwo');
      directiveElem.eq(1).isolateScope().reverse.should.equal(true);
      directiveElem.eq(0).isolateScope().sortType.should.equal('-');
      directiveElem.eq(1).find('span').eq(1).hasClass('fa fa-sort-desc').should.equal(true);
      directiveElem.eq(1).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(false);
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-desc').should.equal(false);
      directiveElem.eq(0).find('span').eq(1).hasClass('fa fa-sort-asc').should.equal(false);

    });
  });





});


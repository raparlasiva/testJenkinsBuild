'use strict';
(function() {
    angular.module('account.module').controller('accountCtrl', function($state, accountSvc) {
        var self = this;
        self.currentPage = $state.current.data.pageId || 1;
        self.add = function() {
            $state.go('tmw.layout.account.add');
        };
        self.getData = function(params) {
            params = params || {};
            self.sortType = params.sortType || '';
            accountSvc.account.get({pageId : self.currentPage, sort: params.sortType},
              function(response) {
                  self.data = response.data;
                  self.totalHits = response.responseDescription.totalHits;
              });
        };
        self.paginationChanged = function(newPage) {
            self.currentPage = newPage;
            self.getData({
                sortType: self.sortType
            });
            $state.current.data.pageId = self.currentPage;
            $state.go('tmw.layout.account');
        };
        self.getData();
    });
})();

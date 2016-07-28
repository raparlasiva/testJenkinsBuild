'use strict';
(function() {
    angular.module('credential.module').controller('credentialCtrl', function($state, $stateParams, credentialSvc) {
        var self = this;
        self.currentPage = 1;
        self.deleting = {};


        self.getData = function(params) {
            params = params || {};
            self.sortType = params.sortType || '';
            credentialSvc.credential.get({accountId : $stateParams.accountId,
                pageId : self.currentPage, sort: params.sortType}, function(response) {
                self.data = response.data;
                self.accountData = $stateParams.accountData ||
                    (response.data.length > 0 ? response.data[0].account : null);
                self.totalHits = response.responseDescription.totalHits;
            });
        };

        self.add = function() {
            $state.go('tmw.layout.credential.add', {accountId : $stateParams.accountId});
        };

        self.edit = function(credentialTable) {
            $state.go('tmw.layout.credential.edit', {'credentialId':credentialTable.id});
        };

        self.confirmDelete = function(credentialTable) {
            self.deleting[credentialTable.id] = true;
        };

        self.cancelDelete = function(credentialTable) {
            self.deleting[credentialTable.id] = false;
        };

        self.delete = function(credentialTable) {
            credentialSvc.credential.delete({
                accountId : $stateParams.accountId,
                credentialId: credentialTable.id
            }, function(response) {
                if(response.$resolved) {
                    $state.go('tmw.layout.credential', {}, { reload: true }); //second parameter is for $stateParams
                }
            });
        };

        self.paginationChanged = function(newPage) {
            self.currentPage = newPage;
            self.getData({
                pageId:self.currentPage,
                sortType: self.sortType
            });
        };

        self.getData();
    });
})();

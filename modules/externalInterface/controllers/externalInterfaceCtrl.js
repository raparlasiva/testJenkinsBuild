'use strict';
(function() {
    angular.module('externalInterface.module')
    .controller('externalInterfaceCtrl', function($state, $stateParams, externalInterfaceSvc) {
        var self = this;
        self.currentPage = 1;
        self.deleting = {};

        self.add = function() {
            $state.go('tmw.layout.externalInterface.add', {accountId : $stateParams.accountId});
        };

        self.getData = function(params) {
            params = params || {};
            self.sortType = params.sortType || '';
            externalInterfaceSvc.externalInterface.get({accountId : $stateParams.accountId,
                pageId : self.currentPage, sort: params.sortType}, function(response) {
                self.data = response.data;
                self.accountData = $stateParams.accountData ||
                    (response.data.length > 0 ? response.data[0].account : null);
                self.totalHits = response.responseDescription.totalHits;
            });
        };

        self.paginationChanged = function(newPage) {
            self.currentPage = newPage;
            self.getData({
                pageId:self.currentPage,
                sortType: self.sortType
            });
        };

        self.edit = function(externalInterfaceTable) {
            $state.go('tmw.layout.externalInterface.edit', {'externalInterfaceId':externalInterfaceTable.id});
        };

        self.confirmDelete = function(externalInterfaceTable) {
            self.deleting[externalInterfaceTable.id] = true;
        };

        self.cancelDelete = function(externalInterfaceTable) {
            self.deleting[externalInterfaceTable.id] = false;
        };

        self.delete = function(externalInterfaceTable) {
            externalInterfaceSvc.externalInterface.delete({
                accountId : $stateParams.accountId,
                externalInterfaceId: externalInterfaceTable.id}, function(response) {
                if(response.$resolved) {
                    //second parameter is for $stateParams
                    $state.go('tmw.layout.externalInterface', {}, { reload: true });
                }

            });
        };

        self.getData();
    });
})();

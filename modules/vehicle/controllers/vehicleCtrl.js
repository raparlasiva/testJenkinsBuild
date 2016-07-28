'use strict';
(function() {
    angular.module('vehicle.module').controller('vehicleCtrl', function($state, $stateParams, vehicleSvc) {
        var self = this;
        self.currentPage = 1;
        self.accountId = $stateParams.accountId;
        self.add = function() {
            $state.go('tmw.layout.vehicle.add', { accountData: self.accountData});
        };
        self.getData = function(params) {
            params = params || {};
            self.sortType = params.sortType || '';
            vehicleSvc.vehicleByCustomer.get({accountId : $stateParams.accountId,
                pageId : self.currentPage, sort: params.sortType},
                function(response) {
                    self.data = response.data;
                    self.accountData = response.data.length > 0 ? response.data[0].account : null;
                    self.totalHits = response.responseDescription.totalHits;
                });
        };
        self.paginationChanged = function(newPage) {
            self.currentPage = newPage;
            self.getData({
                sortType: self.sortType
            });
        };
        self.getData();
    });
})();

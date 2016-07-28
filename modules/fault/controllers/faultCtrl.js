'use strict';
(function() {
    angular.module('fault.module').controller('faultCtrl', function($state, $stateParams, faultSvc) {
        var self = this;
        self.currentPage = 1;
        self.vehicleId = $stateParams.vehicleId;

        self.getData = function(params) {
            params = params || {};
            params.pageId = self.currentPage || 1;
            self.sortType = params.sortType || '';

            if(self.vehicleId) {
                faultSvc.fault.get({
                    accountId:$stateParams.accountId, vehicleId:$stateParams.vehicleId,
                    pageId: params.pageId, sort: params.sortType},
                    function(response) {
                        self.vehicleDescription = response.data.length > 0 ? response.data[0].asset.description : null;
                        self.data = response.data;
                        self.totalHits = response.responseDescription.totalHits;
                    });
            } else {
                $state.go('tmw.layout.customer');
            }
        };
        self.paginationChanged = function() {
            self.getData({
                pageId:self.currentFaultPage,
                sortType: self.sortType
            });
        };
        self.getData();
    });
})();

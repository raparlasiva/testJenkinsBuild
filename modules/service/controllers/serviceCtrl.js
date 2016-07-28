'use strict';
(function() {
    angular.module('service.module').controller('serviceCtrl',
        function($state, $stateParams, serviceSvc, credentialSvc) {
            var self = this;
            self.currentPage = 1;
            // checks whether or not services are defined inside a credential
            self.checkCredentialServices = function() {
                if(self.credentialData.hasOwnProperty('services') && self.credentialData.services.length != 0) {
                    self.totalHits = self.credentialData.services.length;
                    return true;
                } else  {
                    return false;
                }
            };

            self.getData = function(params) {
                params = params || {};
                self.sortType = params.sortType || '';
                serviceSvc.serviceFaults.get({
                    pageId : self.currentPage,
                    sort: params.sortType
                }, function(response) {
                    self.data = response.data;
                    self.totalHits = response.responseDescription.totalHits;
                });
            };

            self.paginationChanged = function(newPage) {
                self.currentPage = newPage;
                self.getData({
                    sortType: self.sortType
                });
            };

            self.saveData = function() {
                self.credentialData.services = self.data;
                credentialSvc.credential.update({
                    accountId : $stateParams.accountId,
                    credentialId : $stateParams.credentialId
                }, self.credentialData, function(response){
                    if(response.$resolved) {
                        $state.go('tmw.layout.credential', {accountId: self.credentialData['account'].id});
                    }
                });
            };

            self.credentialStateParamsIsEmpty = function() {
                if(_.isEmpty($stateParams.credentialData)) {
                    return true;
                } else {
                    return false
                }
            };

            self.callCredentialApi = function() {
                credentialSvc.credential.get({
                    accountId : $stateParams.accountId,
                    credentialId : $stateParams.credentialId
                }, function(response) {
                    self.credentialData = response.data[0];
                    self.checkCredentialServices() ? self.data = self.credentialData.services: self.getData();
                });
            };

            self.populateTableData = function() {
                self.credentialData  = $stateParams.credentialData;
                self.checkCredentialServices() ? self.data = self.credentialData.services: self.getData();
            };

            self.credentialStateParamsIsEmpty() ?  self.callCredentialApi() : self.populateTableData();
        });
})();

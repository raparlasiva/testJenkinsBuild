'use strict';
(function() {
    angular.module('credential.module').controller('credentialAddEditCtrl',
        function($state, $stateParams, credentialSvc, accountSvc) {
            var self = this;
            //------ For Add ------
            if($state.current.name === 'tmw.layout.credential.add') {
                accountSvc.account.get({accountId: $stateParams.accountId},function(response) {
                    self.frmData = {
                        account: response.data.length > 0 ? response.data[0]: {},
                        validFrom: new Date(new Date().getFullYear(), 0, 1),
                        validTo: new Date(2049,11,31)
                    };

                });
            }

            //------ For edit ------
            if($state.current.name === 'tmw.layout.credential.edit') {
                credentialSvc.credential.get({ 
                    accountId: $stateParams.accountId, 
                    credentialId: $stateParams.credentialId
                }, function(response) {
                    self.frmData = response.data.length > 0 ? response.data[0]: {};
                    self.frmData.validFrom = new Date(self.frmData.validFrom);
                    self.frmData.validTo = new Date(self.frmData.validTo);
                });
            }

            self.format = 'MM/dd/yyyy';
            self.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            self.datePickerStatus = {
                validFromOpened: false,
                validToOpened: false
            };

            self.validFromChg = function() {
                self.datePickerStatus.validFromOpened = true;
            };

            self.validToChg = function() {
                self.datePickerStatus.validToOpened = true;
            };

            self.saveData = function(credentialFrm) {
                if(credentialFrm.$invalid || !credentialFrm.$dirty) return false;

                //check for state's to perform PUT/POST operation
                if ($state.current.name === 'tmw.layout.credential.edit') {
                    credentialSvc.credential.update({
                        accountId: $stateParams.accountId,
                        credentialId: $stateParams.credentialId
                    },self.frmData, function(response){
                        if(response.$resolved) {
                            $state.go('tmw.layout.credential');
                        }
                    });
                } else if ($state.current.name === 'tmw.layout.credential.add') {
                    credentialSvc.credential.save({
                        accountId: $stateParams.accountId
                    },self.frmData, function(response){
                        if(response.$resolved) {
                            $state.go('tmw.layout.credential');
                        }
                    });
                }
            };
        });
})();

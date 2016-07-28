'use strict';
(function() {
    angular.module('externalInterface.module').controller('externalInterfaceAddEditCtrl',
        function($state, $stateParams, externalInterfaceSvc, accountSvc) {
            var self = this;
            //------ For Add ------
            if($state.current.name === 'tmw.layout.externalInterface.add') {
                accountSvc.account.get({accountId: $stateParams.accountId},function(response) {
                    self.frmData = {
                        account: response.data.length > 0 ? response.data[0]: {}
                    };
                });
            }

            //------ For edit ------
            if($state.current.name === 'tmw.layout.externalInterface.edit') {
                externalInterfaceSvc.externalInterface.get({
                    accountId: $stateParams.accountId,
                    externalInterfaceId: $stateParams.externalInterfaceId
                },function(response) {
                    self.frmData = response.data.length > 0 ? response.data[0]: {};
                });
            }


            self.saveData = function(externalInterfaceFrm) {
                if(externalInterfaceFrm.$invalid || !externalInterfaceFrm.$dirty) return false;
                
                self.frmData.type === 'Rest' ? self.frmData.wsdl = null: '';

                //check for state's to perform PUT/POST operation
                if ($state.current.name === 'tmw.layout.externalInterface.edit') {
                    externalInterfaceSvc.externalInterface.update({
                        accountId: $stateParams.accountId,
                        externalInterfaceId: $stateParams.externalInterfaceId
                    },self.frmData, function(response){
                        if(response.$resolved) {
                            $state.go('tmw.layout.externalInterface');
                        }
                    });
                } else if ($state.current.name === 'tmw.layout.externalInterface.add') {
                    externalInterfaceSvc.externalInterface.save({
                        accountId: $stateParams.accountId
                    },self.frmData, function(response){
                        if(response.$resolved) {
                            $state.go('tmw.layout.externalInterface');
                        }
                    });
                }
            };
        });
})();

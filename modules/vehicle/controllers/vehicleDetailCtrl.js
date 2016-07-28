'use strict';
(function() {
    angular.module('vehicle.module').controller('vehicleDetailCtrl', function($state, $stateParams, vehicleSvc) {
        var self = this;
        self.accountId = $stateParams.accountId;
        self.getData = function() {
            vehicleSvc.vehicleByCustomer.get({accountId : $stateParams.accountId, vehicleId: $stateParams.vehicleId},
              function(response) {
                  self.data = response.data[0];
                  if (self.data.sourceData){
                      self.data.sourceDataKeyValuePairs = _.pairs(self.data.sourceData);
                  }
              });
        };
        self.getData();
    });
})();

'use strict';
(function() {
    angular.module('tmwServices', []).factory('alertingSvc', function($log) {
        var alerts = [];
        var alertTypes = ['success', 'info', 'warning', 'danger'];
        return {
            addWarning: addWarning,
            addDanger: addDanger,
            addInfo: addInfo,
            addSuccess: addSuccess,
            addAlert: addAlert,
            removeAlert: removeAlert,
            removeAlertByIndex: removeAlertByIndex,
            errorHandler: errorHandler,
            alerts: alerts,
            alertTypes: alertTypes,
            clearAlerts: clearAlerts
        };

        function addWarning(message) {
            addAlert('warning', message);
        }

        function addDanger(message) {
            $log.debug('add danger', message);
            addAlert('danger', message);
        }

        function addInfo(message) {
            addAlert('info', message);
        }

        function addSuccess(message) {
            addAlert('success', message);
        }

        function addAlert(type, message) {
            var alert = { type: type, message: message };
            alerts.push(alert);
            $log.debug('after adding alert ', alerts);
        }

        function clearAlerts() {
            alerts.length = 0;
        }

        function removeAlert(alert) {
            if(alert) {
                if(_.any(alerts,alert)) {
                    alerts.splice(alerts.indexOf(alert), 1)
                }
            }
        }

        function  removeAlertByIndex(index) {
            alerts.splice(alerts[index], 1)
        }

        function errorHandler(description) {
            addDanger(description);
        }

    });
})();



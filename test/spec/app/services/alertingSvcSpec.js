'use strict';

describe('service:alertingSvc', function() {
  var  alertingSvc;

  beforeEach(module('tmwServices'));

  beforeEach(inject(function(_alertingSvc_) {
    alertingSvc = _alertingSvc_;
  }));

  describe('should initialize the alerts', function () {
    it('alertingSvc should be defined', function() {
      assert.isDefined(alertingSvc);
    });

    it('should initially set the alerts method to empty', function() {
      alertingSvc.alerts.should.deep.equal([]);
    });
    it('should initially the alerts types', function() {
      alertingSvc.alertTypes.should.deep.equal(['success', 'info', 'warning', 'danger']);
    });
  });

  describe('should set the appropriate alerts', function () {
    it('should set the warning alert when addWarning method is called', function() {
      alertingSvc.addWarning('Some Warning Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'warning', message: 'Some Warning Message'}]);
    });

    it('should set the danger alert when addDanger method is called', function() {
      alertingSvc.addDanger('Some Danger Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'danger', message: 'Some Danger Message'}]);
    });

    it('should set the Info alert when addInfo method is called', function() {
      alertingSvc.addInfo('Some Info Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'info', message: 'Some Info Message'}]);
    });

    it('should set the warning alert when addWarning method is called', function() {
      alertingSvc.addSuccess('Some Success Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'success', message: 'Some Success Message'}]);
    });

    it('should set the warning alert when addAlert method is called', function() {
      alertingSvc.addAlert('warning','Some Warning Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'warning', message: 'Some Warning Message'}]);
    });

    it('should clear all the alerts when addAlert method is called', function() {
      alertingSvc.addAlert('warning','Some Warning Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'warning', message: 'Some Warning Message'}]);
      alertingSvc.alerts.length.should.equal(1);
      alertingSvc.clearAlerts('warning','Some Warning Message');
      alertingSvc.alerts.length.should.equal(0);
    });

    it('should remove alert by alert object', function() {
      alertingSvc.addAlert('warning','Some Warning Message');
      alertingSvc.addAlert('danger','Some Danger Message');
      alertingSvc.alerts.length.should.equal(2);
      alertingSvc.removeAlert({type: 'danger', message:'Some Danger Message'});
      alertingSvc.alerts.should.deep.equal([{ type: 'warning', message: 'Some Warning Message'}]);
      alertingSvc.alerts.length.should.equal(1);
    });

    it('should not remove a non-existent alert', function() {
      var originalLength = alertingSvc.alerts.length;
      alertingSvc.removeAlert({type:'abc', message:'def'});
      alertingSvc.alerts.length.should.equal(originalLength);
    });


    it('should remove alert by index', function() {
      alertingSvc.addAlert('warning','Some Warning Message');
      alertingSvc.addAlert('danger','Some Danger Message');
      alertingSvc.alerts.length.should.equal(2);
      alertingSvc.removeAlertByIndex(0);
      alertingSvc.alerts.should.deep.equal([{ type: 'danger', message: 'Some Danger Message'}]);
      alertingSvc.alerts.length.should.equal(1);
    });


    it('should add a danger message when error handler is called', function() {
      alertingSvc.errorHandler('Some Danger Message');
      alertingSvc.alerts.should.deep.equal([{ type: 'danger', message: 'Some Danger Message'}]);
      alertingSvc.alerts.length.should.equal(1);
    });
  });



});



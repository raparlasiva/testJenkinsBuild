'use strict';

describe('credentailSvc service', function() {

    // load modules
    beforeEach(module('credential.module'));

    describe('credentialSvc defined and able to fetch', function () {
        //Test service availability
        it('check the existence of credentialSvc factory', inject(function(credentialSvc) {
            assert.isDefined(credentialSvc);
            assert.isDefined(credentialSvc.credential);
        }));

        it('should call credential POST when adding a new credential to an account', inject(function (credentialSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('POST', environmentSvc.baseUrl('dev') + '/accounts/12/credentials').respond({data: 'test'});
            credentialSvc.credential.save({accountId: 12},function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));

        it('should call a single credential with crdentialId (GET method) and respond back with data', inject(function (credentialSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/12/credentials/123').respond({data:'test'});
            credentialSvc.credential.get({accountId: 12, credentialId: 123}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));
        it('should call all credential  with accountId (GET method) and respond back with data', inject(function (credentialSvc, $httpBackend, environmentSvc) {
            $httpBackend.when('GET',environmentSvc.baseUrl('dev') + '/accounts/783/credentials').respond({data:'test'});
            credentialSvc.credential.get({accountId: 783}, function(response) {
                response.data.should.equal('test');
            });
            $httpBackend.flush();
        }));
    });
});

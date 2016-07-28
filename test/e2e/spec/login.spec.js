describe('Test Login functionality- ', function() {

    it('should log in with a Angular page', function() {
        var angularElement = element(by.css('[ng-click="ctrl.logout()"]'));
        expect(angularElement.getText()).toEqual('Sign Out:test');

        // Check the login name from the local storage.
        var item = browser.executeScript(" return window.localStorage.getItem('loginName'); ");
        expect(item).toEqual('test');
    });

});
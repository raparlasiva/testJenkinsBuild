var CredentialAddEditPage = require('../pages/credentialAddEditPage');

describe('Credential Add Page - ', function() {
    var credentialAddEditPage = new CredentialAddEditPage();

    it('should display the External Interface add url ', function() {
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/credential/add?accountId=2');
    });

    it('should display the save button', function() {
        expect(credentialAddEditPage.backButton.isDisplayed()).toBe(true);
    });

    it('should display the save button', function() {
        expect(credentialAddEditPage.saveButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the Back btn', function() {
        expect(credentialAddEditPage.backButton.getText()).toBe('Back');
    });

    it('should display the text on the Save btn', function() {
        expect(credentialAddEditPage.saveButton.getText()).toBe('Save');
    });

    it('The save button should be disabled when form loads', function() {
        expect(credentialAddEditPage.saveButton.getAttribute('disabled')).toEqual('true');
    });

    it('The save button should be enabled when form is filled out correctly - Rest', function() {
        credentialAddEditPage.username.sendKeys('some username');
        credentialAddEditPage.password.sendKeys('some password');
        expect(credentialAddEditPage.saveButton.getAttribute('disabled')).toEqual(null);
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        credentialAddEditPage.password.clear();
        credentialAddEditPage.clickSaveButton();
        expect(credentialAddEditPage.password.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is filled out correctly and submitted it should redirect to External Interface list page', function() {
        credentialAddEditPage.password.sendKeys('some password');
        credentialAddEditPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/credential?accountId=2');
        browser.get('/#/layout/credential/edit?credentialId=35&accountId=2');
    });
});

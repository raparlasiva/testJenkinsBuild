var CredentialAddEditPage = require('../pages/credentialAddEditPage');

describe('Credential Edit Page - ', function() {
    var credentialAddEditPage = new CredentialAddEditPage();

    it('should display the Credential edit url ', function() {
        expect(browser.getCurrentUrl()).toContain('/#/layout/credential/edit');
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

    it('The edit form should have form data filled out', function() {
        expect(credentialAddEditPage.username.getAttribute('value')).toBe('some username');
        expect(credentialAddEditPage.password.getAttribute('value')).toBe('some password');
        expect(credentialAddEditPage.validFrom.getAttribute('value')).toBe('01/01/2016');
        expect(credentialAddEditPage.validTo.getAttribute('value')).toBe('12/31/2049');
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        credentialAddEditPage.password.clear();
        credentialAddEditPage.clickSaveButton();
        expect(credentialAddEditPage.password.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is edited out correctly and submitted it should redirect to Credential list page', function() {
        credentialAddEditPage.password.sendKeys('some password edited');
        credentialAddEditPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/credential?accountId=2');
    });
});


var AccountAddPage = require('../pages/accountAddPage');

describe('Account Add Page - ', function() {
    var accountAddPage = new AccountAddPage();

    it('should display the account add url ', function() {
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account/add');
    });

    it('should display the save button', function() {
        expect(accountAddPage.backButton.isDisplayed()).toBe(true);
    });

    it('should display the save button', function() {
        expect(accountAddPage.saveButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the Back btn', function() {
        expect(accountAddPage.backButton.getText()).toBe('Back');
    });

    it('should display the text on the Save btn', function() {
        expect(accountAddPage.saveButton.getText()).toBe('Save');
    });

    it('The save button should be disabled when form loads', function() {
        expect(accountAddPage.saveButton.getAttribute('disabled')).toEqual('true');
    });

    it('The save button should be enabled when form is filled out correctly', function() {
        accountAddPage.accountName.sendKeys('Testname');
        accountAddPage.accountType.get(0).click();

        expect(accountAddPage.saveButton.getAttribute('disabled')).toEqual(null);
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        accountAddPage.accountName.clear();
        accountAddPage.accountType.get(0).click();
        accountAddPage.clickSaveButton();

        expect(accountAddPage.accountName.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is filled out correctly and submitted it should redirect to account list page', function() {
        accountAddPage.accountName.sendKeys('Testname');
        accountAddPage.accountType.get(1).click();

        accountAddPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account');

        browser.get('/#/layout/vehicle?accountId=1');
    });
});
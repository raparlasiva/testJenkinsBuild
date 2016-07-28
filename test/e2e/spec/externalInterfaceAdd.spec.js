var ExternalInterfaceAddEditPage = require('../pages/externalInterfaceAddEditPage');

describe('External Interface Add Page - ', function() {
    var externalInterfaceAddEditPage = new ExternalInterfaceAddEditPage();

    it('should display the External Interface add url ', function() {
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/externalInterface/add?accountId=1');
    });

    it('should display the save button', function() {
        expect(externalInterfaceAddEditPage.backButton.isDisplayed()).toBe(true);
    });

    it('should display the save button', function() {
        expect(externalInterfaceAddEditPage.saveButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the Back btn', function() {
        expect(externalInterfaceAddEditPage.backButton.getText()).toBe('Back');
    });

    it('should display the text on the Save btn', function() {
        expect(externalInterfaceAddEditPage.saveButton.getText()).toBe('Save');
    });

    it('The save button should be disabled when form loads', function() {
        expect(externalInterfaceAddEditPage.saveButton.getAttribute('disabled')).toEqual('true');
    });

    it('The save button should be enabled when form is filled out correctly - Rest', function() {
        externalInterfaceAddEditPage.type.all(by.css('option[value="Rest"]')).click();
        externalInterfaceAddEditPage.username.sendKeys('some username');
        externalInterfaceAddEditPage.password.sendKeys('some password');
        externalInterfaceAddEditPage.url.sendKeys('some url');
        expect(externalInterfaceAddEditPage.saveButton.getAttribute('disabled')).toEqual(null);
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        externalInterfaceAddEditPage.password.clear();
        externalInterfaceAddEditPage.clickSaveButton();
        expect(externalInterfaceAddEditPage.password.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is filled out correctly and submitted it should redirect to External Interface list page', function() {
        externalInterfaceAddEditPage.password.sendKeys('some password');
        externalInterfaceAddEditPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/externalInterface?accountId=1');
        browser.get('#/layout/externalInterface/edit?externalInterfaceId=1&accountId=1');
    });
});

var ExternalInterfaceAddEditPage = require('../pages/externalInterfaceAddEditPage');

describe('External Interface Edit Page - ', function() {
    var externalInterfaceAddEditPage = new ExternalInterfaceAddEditPage();
    
    it('should display the External Interface edit url ', function() {
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/externalInterface/edit?externalInterfaceId=1&accountId=1');
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

    it('The edit form should have form data filled out', function() {
        expect(externalInterfaceAddEditPage.type.getAttribute('value')).toBe('Rest');
        expect(externalInterfaceAddEditPage.username.getAttribute('value')).toBe('some username');
        expect(externalInterfaceAddEditPage.password.getAttribute('value')).toBe('some password');
        expect(externalInterfaceAddEditPage.url.getAttribute('value')).toBe('some url');
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        externalInterfaceAddEditPage.password.clear();
        externalInterfaceAddEditPage.clickSaveButton();
        expect(externalInterfaceAddEditPage.password.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is edited out correctly and submitted it should redirect to External Interface list page', function() {
        externalInterfaceAddEditPage.password.sendKeys('some password edited');
        externalInterfaceAddEditPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/externalInterface?accountId=1');
        browser.get('/#/layout/credential?accountId=2');
    });
});


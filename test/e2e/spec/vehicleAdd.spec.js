var VehicleAddPage = require('../pages/vehicleAddPage');

describe('Vehicle Add Page - ', function() {
    var vehicleAddPage = new VehicleAddPage();

    it('should display the vehicle add url ', function() {
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle/add?accountId=1');
    });

    it('should display the save button', function() {
        expect(vehicleAddPage.backButton.isDisplayed()).toBe(true);
    });

    it('should display the save button', function() {
        expect(vehicleAddPage.saveButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the Back btn', function() {
        expect(vehicleAddPage.backButton.getText()).toBe('Back');
    });

    it('should display the text on the Save btn', function() {
        expect(vehicleAddPage.saveButton.getText()).toBe('Save');
    });

    it('The save button should be disabled when form loads', function() {
        expect(vehicleAddPage.saveButton.getAttribute('disabled')).toEqual('true');
    });

    it('The save button should be enabled when form is filled out correctly', function() {
        vehicleAddPage.vehicleDescription.sendKeys('some vehicle description');

        expect(vehicleAddPage.saveButton.getAttribute('disabled')).toEqual(null);
    });

    it('when form is NOT filled out correctly it should display validation error', function() {
        vehicleAddPage.vehicleDescription.clear();

        vehicleAddPage.clickSaveButton();

        expect(vehicleAddPage.vehicleDescription.getAttribute('class')).toContain('ng-invalid');
    });

    it('when form is filled out correctly and submitted it should redirect to vehicle list page', function() {
        vehicleAddPage.vehicleDescription.sendKeys('again some vehicle description');

        vehicleAddPage.clickSaveButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle?accountId=1');

        browser.get('/#/layout/vehicle/detail?vehicleId=1&accountId=1');
    });
});
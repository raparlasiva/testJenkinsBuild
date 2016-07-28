var VehicleDetailPage = require('../pages/vehicleDetailPage');

describe('Vehicle Detail Page - ', function() {
    var vehicleDetailPage = new VehicleDetailPage();
    var panelHeadingList, panelBodyList ;

    describe('should have the panel headings info', function() {
        beforeEach(function() {
            panelHeadingList = vehicleDetailPage.getPanelHeading();
        });

        it('should have two panel headings and both should be visible', function() {
            expect(panelHeadingList.count()).toEqual(2);
        });

        it('should  be visible', function() {
            expect(panelHeadingList.get(0).isDisplayed()).toBe(true);
            expect(panelHeadingList.get(1).isDisplayed()).toBe(true);
        });

        it('should set panel headings text for "vehicle info"', function() {
            expect(panelHeadingList.get(0).getText()).toContain('Vehicle Information');
        });

        it('should set panel headings text for "additional details"', function() {
            expect(panelHeadingList.get(1).getText()).toContain('Additional Details');
        });
    });

    describe('should have vehicle information info- ', function() {
        beforeEach(function() {
            panelBodyList = vehicleDetailPage.getPanelBody();
        });

        it('should have column name set to "Id"', function() {
            expect(panelBodyList.get(0).$$('span').get(0).getText()).toEqual('Id:');
        });

        it('should have column name set to "Description"', function() {
            expect(panelBodyList.get(0).$$('span').get(1).getText()).toEqual('Description:');
        });

        it('should have column name set to "Owner"', function() {
            expect(panelBodyList.get(0).$$('span').get(2).getText()).toEqual('Owner:');
        });

        it('should have Vehicle Id', function() {
            expect(panelBodyList.get(0).$$('input').get(0).getAttribute('value'))
                .toEqual(element.all(by.css('input')).get(0).getAttribute('value'));
        });

        it('should have Vehicle Description', function() {
            expect(panelBodyList.get(0).$$('input').get(1).getAttribute('value'))
                .toEqual(element.all(by.css('input')).get(1).getAttribute('value'));
        });

        it('should set Vehicle Owner', function() {
            expect(panelBodyList.get(0).$$('input').get(2).getAttribute('value'))
                .toEqual(element.all(by.css('input')).get(2).getAttribute('value'));
        });
    });

    describe('should have Additional Details info', function() {
        beforeEach(function() {
            panelBodyList = vehicleDetailPage.getPanelBody();
        });

        it('should have column name\'s and input values set for "additional details panel heading"', function() {
            element.all(by.repeater('row in ctrl.data.sourceDataKeyValuePairs')).then(function(data) {
                data.forEach(function(currentValue, index) {
                    expect(currentValue.element(by.css('span')).getText())
                        .toEqual(panelBodyList.get(1).$$('span').get(index).getText());
                    expect(currentValue.element(by.css('input')).getAttribute('value'))
                        .toEqual(panelBodyList.get(1).$$('input').get(index).getAttribute('value'));
                });
            });
        });
    });
    describe('"back" button ', function() {

        it('should display the save button', function() {
            expect(vehicleDetailPage.backButton.isDisplayed()).toBe(true);
        });

        it('should navigate to vehicle page when back button is clicked', function() {
            vehicleDetailPage.clickBackButton();
            expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle?accountId=1');
            browser.navigate().back();
            browser.get('/#/layout/fault?vehicleId=2&accountId=2');
        });
    });

});
var VehicleListPage = require('../pages/vehicleListPage');

describe('Vehicle List Page - ', function() {
    var vehicleListPage = new VehicleListPage();

    it('should display the add button', function() {
        expect(vehicleListPage.addButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the add button as "Add"', function() {
        expect(vehicleListPage.addButton.getText()).toBe('Add');
    });

    it('should match the vehicle table column Names', function() {
        var list = vehicleListPage.getTableColNames();
        expect(list.get(0).getText()).toBe('Vehicle Description ');
        expect(list.get(1).getText()).toBe('Fault');
    });

    it('should display "n" rows of data', function() {
        var rowData = vehicleListPage.getTableRowData();
        expect(rowData.count()).toEqual(element.all(by.repeater('row in ctrl.data')).count());
    });

    it('should display table data', function() {
        var rowData = vehicleListPage.getTableRowData();
        expect(rowData.first().$$('td').get(0).getText()).toBe(element(by.repeater('row in ctrl.data').row(0).column('row.description')).getText());

        expect(rowData.last().$$('td').get(1).$('a').getAttribute('class')).toBe('anchor-normal');
        expect(rowData.last().$$('td').get(1).$('a').$('i').getAttribute('class')).toBe('fa fa-wrench');
    });

    it('should navigate to vehicle detail page when vehicle description link is clicked', function() {
        vehicleListPage.vehicleDescriptionClick();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle/detail?vehicleId=1&accountId=1');
        browser.navigate().back();
    });

    it('should navigate to Fault page when Fault link is clicked', function() {
        vehicleListPage.faultClick();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/fault?vehicleId=1&accountId=1');
        browser.navigate().back();
    });


    it('should navigate to vehicle add page when "add" button is clicked', function() {
        vehicleListPage.clickVehicleAddButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle/add?accountId=1');
    });
});